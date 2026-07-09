import { unstable_cache } from 'next/cache'

export type GitHubContributionDay = {
  date: string
  count: number
  color: string
}

export type GitHubShowcaseRepo = {
  name: string
  stargazerCount: number
  url: string
}

export type GitHubContributionsPayload = {
  login: string
  url: string
  avatarUrl: string
  totalContributions: number
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

type GraphQLResponse = {
  data?: {
    user: {
      avatarUrl: string
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number
          weeks: Array<{
            contributionDays: Array<{
              contributionCount: number
              date: string
              color: string
            }>
          }>
        }
      } | null
    } | null
    showcaseRepo: {
      name: string
      stargazerCount: number
      url: string
    } | null
  }
  errors?: Array<{ message: string }>
}

export function contributionLevelClass(count: number): string {
  if (count <= 0) return 'home-de-about__github-day--0'
  if (count <= 2) return 'home-de-about__github-day--1'
  if (count <= 5) return 'home-de-about__github-day--2'
  if (count <= 9) return 'home-de-about__github-day--3'
  return 'home-de-about__github-day--4'
}

function parseShowcaseRepo(
  raw: { name: string; stargazerCount: number; url: string } | null | undefined
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

  const weeks: GitHubContributionDay[][] = calendar.weeks.map((week) =>
    week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      color: day.color || '',
    }))
  )

  return {
    login,
    url: `https://github.com/${login}`,
    avatarUrl: user.avatarUrl,
    totalContributions: calendar.totalContributions,
    showcaseRepo: parseShowcaseRepo(body.data?.showcaseRepo ?? null),
    weeks,
  }
}

/** Last year of public contributions. Server-only — set GITHUB_TOKEN at build/dev time. */
export async function getGitHubContributions(): Promise<GitHubContributionsPayload | null> {
  const login = (process.env.GITHUB_CONTRIBUTIONS_LOGIN || 'vraj247').trim()
  const showcaseRepoName = (process.env.GITHUB_SHOWCASE_REPO ?? 'swiftuibuttons').trim() || 'swiftuibuttons'
  if (!login) return null

  if (process.env.NODE_ENV === 'development') {
    return fetchGitHubContributionsUncached(login, showcaseRepoName)
  }

  return unstable_cache(
    () => fetchGitHubContributionsUncached(login, showcaseRepoName),
    ['github-contributions', 'v4-about', login, showcaseRepoName],
    { revalidate: 3600 }
  )()
}
