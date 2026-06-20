import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { getSessionUser } from '@/lib/auth/session'
import { getPackageByIdForUser } from '@/lib/db/packages'
import { LovableSetupWizard } from '@/components/recipes/LovableSetupWizard'

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const user = await getSessionUser()
  if (!user) redirect('/login')

  const { id } = await params
  const pkg = await getPackageByIdForUser(id, user.id)
  if (!pkg) notFound()

  const moduleName =
    pkg.module_name ??
    pkg.package_title.replace(/^Pacote — (Base \+ )?/, '')

  return (
    <div className="max-w-3xl space-y-6">
      <Link
        href="/app/receitas-do-sistema"
        className="inline-flex items-center gap-1.5 text-sm text-[#6F6657] hover:text-[#443E35] transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        Receitas do Sistema
      </Link>
      <LovableSetupWizard package={pkg} moduleName={moduleName} />
    </div>
  )
}
