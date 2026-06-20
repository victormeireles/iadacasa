'use client'

import { useState } from 'react'
import { Download, FileText, Loader2, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { downloadPackageFile } from '@/lib/client/download-package-file'
import { refreshPackageFiles } from '@/app/actions/packages'
import type { PackageFile } from '@/types/packages'

interface PackageFileListProps {
  files: PackageFile[]
  packageId: string
  showBaseHint: boolean
  onFilesUpdated?: (files: PackageFile[], prompt?: string) => void
}

export function PackageFileList({
  files: initialFiles,
  packageId,
  showBaseHint,
  onFilesUpdated,
}: PackageFileListProps) {
  const [files, setFiles] = useState(initialFiles)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const hasBlockFiles = files.some(f => f.knowledge_block_id !== null)

  async function handleRefresh() {
    setRefreshing(true)
    setError(null)
    try {
      const result = await refreshPackageFiles(packageId)
      if (result.error) throw new Error(result.error)
      if (result.files) {
        setFiles(result.files)
        onFilesUpdated?.(result.files, result.prompt)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível preparar os arquivos.')
    } finally {
      setRefreshing(false)
    }
  }

  if (!hasBlockFiles) {
    return (
      <div className="rounded-lg border border-[#EDCD8A] bg-[#F9EFD6] p-4 space-y-3">
        <p className="text-sm text-[#443E35] leading-relaxed">
          Os arquivos deste pacote ainda não estão prontos para download. Isso pode acontecer
          com pacotes gerados antes de uma atualização da plataforma.
        </p>
        <Button
          type="button"
          onClick={handleRefresh}
          disabled={refreshing}
          className="bg-[#235139] hover:bg-[#1B3D2E] text-white"
        >
          {refreshing ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Preparando arquivos…</>
          ) : (
            <><RefreshCw className="mr-2 h-4 w-4" /> Preparar arquivos para download</>
          )}
        </Button>
        {error && <p className="text-xs text-[#A9761F]">{error}</p>}
        <p className="text-xs text-[#6F6657]">
          Se o problema continuar, acesse <strong>Suporte</strong> no menu da plataforma.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {showBaseHint && (
        <div className="rounded-lg border border-[#EDCD8A] bg-[#F9EFD6] p-3">
          <p className="text-xs text-[#A9761F] leading-relaxed">
            Depois de anexar no Lovable, <strong>mantenha os arquivos de base e regras no projeto</strong>.
            Nos próximos módulos você só anexará o arquivo do módulo novo.
          </p>
        </div>
      )}

      <ul className="space-y-2">
        {files.map(file => (
          <li
            key={file.filename}
            className="flex items-center justify-between gap-3 rounded-lg border border-[#E2D5C0] bg-white p-3"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F5EEE1]">
                <FileText className="h-4 w-4 text-[#235139]" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-[#211E19] truncate">{file.filename}</p>
                <p className="text-xs text-[#6F6657] truncate">{file.title}</p>
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="shrink-0 border-[#E2D5C0]"
              onClick={() => downloadPackageFile(file)}
            >
              <Download className="mr-1.5 h-3.5 w-3.5" />
              Baixar
            </Button>
          </li>
        ))}
      </ul>

      <a href={`/api/packages/${packageId}/download-zip`} download>
        <Button type="button" variant="outline" className="w-full border-[#C3DAC9] text-[#235139]">
          <Download className="mr-2 h-4 w-4" />
          Baixar todos (.zip)
        </Button>
      </a>
    </div>
  )
}
