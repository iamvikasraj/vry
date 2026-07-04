import type { Project } from '@/data/projects'
import type { ProjectPreviewMedia, ProjectThumbMedia } from '@/lib/projectMedia'
import { hasPublicAsset } from '@/lib/projectAssets'

function resolveThumbSrc(project: Project): string | undefined {
  if (project.videoPoster && hasPublicAsset(project.videoPoster)) {
    return project.videoPoster
  }

  const posterJpg = `/assets/projects/${project.slug}/poster.jpg`
  if (hasPublicAsset(posterJpg)) return posterJpg

  const posterPng = `/assets/projects/${project.slug}/poster.png`
  if (hasPublicAsset(posterPng)) return posterPng

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
