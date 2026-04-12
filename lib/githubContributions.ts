import { unstable_cache } from 'next/cache'

export type GitHubContributionDay = {
  date: string
  count: number
  color: string
}

/** Single highlighted repo (e.g. SwiftUI buttons) with live star count. */
export type GitHubShowcaseRepo = {
  name: string
  stargazerCount: number
  url: string
}

export type GitHubContributionsPayload = {
  login: string
  /** Profile image URL from GitHub (typically avatars.githubusercontent.com). */
  avatarUrl: string
  totalContributions: number
  /** Public repo under `login` to feature next to contributions (null if missing or private). */
  showcaseRepo: GitHubShowcaseRepo | null
  /** Weeks oldest → newest; each week is Sun → Sat from GitHub. */
  weeks: GitHubContributionDay[][]
}

const USER_GITHUB_QUERY = `
  query UserContributions($login: String!, $repoName: String!) {
    user(login: $login) {
      avatarUrl
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
              color
            }
          }
        }
      }
    }
    showcaseRepo: repository(owner: $login, name: $repoName) {
      name
      stargazerCount
      url
    }
  }
`

type GraphQLContributionCalendar = {
  totalContributions: number
  weeks: Array<{
    contributionDays: Array<{
      contributionCount: number
      date: string
      color: string
    }>
  }>
}

type GraphQLUserPayload = {
  avatarUrl: string
  contributionsCollection: {
    contributionCalendar: GraphQLContributionCalendar
  } | null
}

type GraphQLResponse = {
  data?: {
    user: GraphQLUserPayload | null
    showcaseRepo: {
      name: string
      stargazerCount: number
      url: string
    } | null
  }
  errors?: Array<{ message: string }>
}

export function contributionLevelClass(count: number): string {
  if (count <= 0) return 'home-terminal-github-day--0'
  if (count <= 2) return 'home-terminal-github-day--1'
  if (count <= 5) return 'home-terminal-github-day--2'
  if (count <= 9) return 'home-terminal-github-day--3'
  return 'home-terminal-github-day--4'
}

function parseShowcaseRepo(
  raw:
    | {
        name: string
        stargazerCount: number
        url: string
      }
    | null
    | undefined
): GitHubShowcaseRepo | null {
  if (!raw?.name || raw.url == null || typeof raw.stargazerCount !== 'number') return null
  return {
    name: raw.name,
    stargazerCount: raw.stargazerCount,
    url: raw.url,
  }
}

async function fetchGitHubContributionsUncached(
  login: string,
  showcaseRepoName: string
): Promise<GitHubContributionsPayload | null> {
  const token = process.env.GITHUB_TOKEN?.trim()
  if (!token) return null

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: USER_GITHUB_QUERY,
      variables: { login, repoName: showcaseRepoName },
    }),
  })

  if (!res.ok) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[githubContributions] GraphQL HTTP', res.status, await res.text().catch(() => ''))
    }
    return null
  }

  const body = (await res.json()) as GraphQLResponse
  if (body.errors?.length) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[githubContributions] GraphQL errors:', JSON.stringify(body.errors, null, 2))
    }
    return null
  }

  const user = body.data?.user
  const calendar = user?.contributionsCollection?.contributionCalendar
  if (!user?.avatarUrl || !calendar?.weeks?.length) return null

  const weeks: GitHubContributionDay[][] = calendar.weeks.map((w) =>
    w.contributionDays.map((d) => ({
      date: d.date,
      count: d.contributionCount,
      color: d.color || '',
    }))
  )

  return {
    login,
    avatarUrl: user.avatarUrl,
    totalContributions: calendar.totalContributions,
    showcaseRepo: parseShowcaseRepo(body.data?.showcaseRepo ?? null),
    weeks,
  }
}

/**
 * Last year of public contributions (GitHub calendar). Server-only.
 * Set `GITHUB_TOKEN` and optionally `GITHUB_CONTRIBUTIONS_LOGIN`, `GITHUB_SHOWCASE_REPO`.
 */
export async function getGitHubContributions(): Promise<GitHubContributionsPayload | null> {
  const login = (process.env.GITHUB_CONTRIBUTIONS_LOGIN || 'iamvikasraj').trim()
  const showcaseRepoNameRaw = (process.env.GITHUB_SHOWCASE_REPO ?? 'swiftuibuttons').trim()
  const showcaseRepoName = showcaseRepoNameRaw || 'swiftuibuttons'
  if (!login) return null

  if (process.env.NODE_ENV === 'development') {
    return fetchGitHubContributionsUncached(login, showcaseRepoName)
  }

  return unstable_cache(
    () => fetchGitHubContributionsUncached(login, showcaseRepoName),
    ['github-contributions', 'v3-showcase', login, showcaseRepoName],
    { revalidate: 3600 }
  )()
}
