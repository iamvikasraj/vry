export type ProjectPreviewMedia = {
  brandCover: boolean
  coverAvailable: boolean
  videoAvailable: boolean
}

export type ProjectThumbMedia = ProjectPreviewMedia & {
  thumbSrc?: string
}
