'use client'

type HomeDeEmailLinkProps = {
  className?: string
}

/** Opens mailto without putting the address in static HTML. */
export default function HomeDeEmailLink({ className }: HomeDeEmailLinkProps) {
  const openEmail = () => {
    const local = 'hello'
    const domain = ['vikasrajyadav', 'com'].join('.')
    window.location.href = `mailto:${local}@${domain}`
  }

  return (
    <button type="button" className={className} onClick={openEmail}>
      Email me
    </button>
  )
}
