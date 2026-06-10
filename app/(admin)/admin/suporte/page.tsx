import { MessageSquare } from 'lucide-react'

export default function AdminSuportePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#211E19] mb-1">Travas e suporte</h1>
        <p className="text-[#6F6657]">Formulários de suporte enviados pelos clientes.</p>
      </div>

      <div className="rounded-[18px] border border-[#E2D5C0] bg-[#FFFDF9] p-12 text-center shadow-[0_1px_3px_rgba(33,30,25,0.08)]">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F5EEE1] mx-auto mb-4">
          <MessageSquare className="h-7 w-7 text-[#443E35]" />
        </div>
        <h2 className="font-semibold text-[#211E19] mb-2">Nenhuma trava aberta</h2>
        <p className="text-sm text-[#6F6657]">
          Quando clientes enviarem formulários de suporte, eles aparecerão aqui para análise.
        </p>
      </div>
    </div>
  )
}
