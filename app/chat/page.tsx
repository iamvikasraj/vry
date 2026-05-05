import Link from 'next/link'
import PortfolioChat from '@/components/PortfolioChat'

export const metadata = {
  title: 'Chat with Ti — Vikas Raj Yadav',
  description: 'Ask Ti anything about Vikas — his work, skills, and whether he\'d be a great fit for your team.',
}

export default function ChatPage() {
  return (
    <div className="chat-page">
      <header className="chat-page-header">
        <Link href="/" className="chat-page-back">← Back</Link>
        <span className="chat-page-title">Ti — ask me anything about Vikas</span>
      </header>
      <div className="chat-page-body">
        <PortfolioChat />
      </div>
    </div>
  )
}
