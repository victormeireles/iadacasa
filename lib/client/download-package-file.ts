import type { PackageFile } from '@/types/packages'

export function downloadPackageFile(file: PackageFile) {
  const blob = new Blob([file.content_markdown], { type: 'text/markdown;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = file.filename
  a.click()
  URL.revokeObjectURL(url)
}
