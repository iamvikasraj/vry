import ClientScripts from '@/components/ClientScripts'
import HomeTerminalLayout from '@/components/HomeTerminalLayout'
import { getGitHubContributions } from '@/lib/githubContributions'

export default async function Home() {
  const githubContributions = await getGitHubContributions()

  return (
    <div className="page-container">
      <main>
        <HomeTerminalLayout githubContributions={githubContributions} />
      </main>
      <ClientScripts />
    </div>
  )
}
