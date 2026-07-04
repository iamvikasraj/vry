type ProjectToolsProps = {
  children: React.ReactNode
}

export default function ProjectTools({ children }: ProjectToolsProps) {
  return <ul className="project-tools">{children}</ul>
}
