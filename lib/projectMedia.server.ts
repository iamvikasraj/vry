import type { Project } from '@/data/projects'
import { hasPublicAsset } from '@/lib/projectAssets'

export type ProjectPreviewMedia = {
  brandCover: boolean
  coverAvailable: boolean
  videoAvailable: boolean
}

export function getProjectPreviewMedia(project: Project): ProjectPreviewMedia {
  return {
    brandCover: Boolean(project.coverImage?.endsWith('.svg')),
    coverAvailable: project.coverImage ? hasPublicAsset(project.coverImage) : false,
    videoAvailable: hasPublicAsset(project.video),
  }
}
