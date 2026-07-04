type ProjectToolProps = {
  name: string
  description: string
  logo?: string
}

export default function ProjectTool({ name, description, logo }: ProjectToolProps) {
  return (
    <li className="project-tool">
      {logo ? (
        <img src={logo} alt="" className="project-tool__logo" width={24} height={24} decoding="async" />
      ) : (
        <span className="project-tool__logo project-tool__logo--placeholder" aria-hidden />
      )}
      <p className="project-tool__text">
        <strong className="mdx-strong">{name}</strong>
        {' — '}
        {description}
      </p>
    </li>
  )
}
