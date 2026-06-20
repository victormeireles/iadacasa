import JSZip from 'jszip'
import { getSessionUser } from '@/lib/auth/session'
import { getPackageByIdForUser } from '@/lib/db/packages'

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const user = await getSessionUser()
  if (!user) return new Response('Unauthorized', { status: 401 })

  const pkg = await getPackageByIdForUser(id, user.id)
  if (!pkg) return new Response('Not found', { status: 404 })

  const zip = new JSZip()
  for (const file of pkg.files_json ?? []) {
    zip.file(file.filename, file.content_markdown)
  }

  const buffer = await zip.generateAsync({ type: 'arraybuffer' })

  return new Response(buffer, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="pacote-${id.slice(0, 8)}.zip"`,
    },
  })
}
