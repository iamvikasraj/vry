import type { Project } from '@/data/projects'
import type { ProjectPreviewMedia, ProjectThumbMedia } from '@/lib/projectMedia'
import { hasPublicAsset } from '@/lib/projectAssets'

function resolveThumbSrc(project: Project): string | undefined {
  if (project.coverImage && hasPublicAsset(project.coverImage)) {
    return project.coverImage
  }
  if (project.images) {
    for (const src of project.images) {
      if (hasPublicAsset(src)) return src
    }
  }
  return undefined
}

export function getProjectPreviewMedia(project: Project): ProjectPreviewMedia {
  return {
    brandCover: Boolean(project.coverImage?.endsWith('.svg')),
    coverAvailable: Boolean(project.coverImage && hasPublicAsset(project.coverImage)),
    videoAvailable: hasPublicAsset(project.video),
  }
}

export function getProjectThumbMedia(project: Project): ProjectThumbMedia {
  const thumbSrc = resolveThumbSrc(project)
  return {
    brandCover: Boolean(thumbSrc?.endsWith('.svg')),
    coverAvailable: Boolean(project.coverImage && hasPublicAsset(project.coverImage)),
    videoAvailable: hasPublicAsset(project.video),
    thumbSrc,
  }
}
