/** Encode path segments so filenames with spaces, &, etc. load correctly in video/img src. */
export function mediaAssetPath(path: string): string {
  return path
    .split('/')
    .map((segment) => (segment ? encodeURIComponent(segment) : segment))
    .join('/')
}
