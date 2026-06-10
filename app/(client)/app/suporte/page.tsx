'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export default function SuportePage() {
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    // Mock — in production this would save to Supabase
    await new Promise(r => setTimeout(r, 1200))
    setSent(true)
    setLoading(false)
    toast.success('Trava enviada! Vamos analisar em breve.')
  }

  if (sent) {
    return (
      <div className="max-w-lg">
        <div className="rounded-[18px] border border-[#C3DAC9] bg-[#DEEBE1] p-8 text-center">
          <div className="text-3xl mb-3">✅</div>
          <h2 className="font-semibold text-[#143025] text-lg mb-2">Trava enviada!</h2>
          <p className="text-sm text-[#235139] leading-relaxed">
            Recebemos sua mensagem. Nossa equipe vai analisar e responder pelo grupo da comunidade
            ou por e-mail em breve.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#211E19] mb-1">Reportar uma trava</h1>
        <p className="text-[#6F6657] leading-relaxed">
          Travou na implementação? Preencha o formulário com o máximo de detalhes possível
          para que possamos ajudar.
        </p>
      </div>

      <div className="rounded-[18px] border border-[#E2D5C0] bg-[#FFFDF9] p-6 shadow-[0_1px_3px_rgba(33,30,25,0.08)]">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-[#443E35]">Seu nome *</Label>
              <Input required placeholder="Nome completo" className="border-[#E2D5C0]" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-[#443E35]">Restaurante *</Label>
              <Input required placeholder="Nome do restaurante" className="border-[#E2D5C0]" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-[#443E35]">Módulo</Label>
              <Input placeholder="Ex: Ficha Técnica" className="border-[#E2D5C0]" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-[#443E35]">Ferramenta usada</Label>
              <Input placeholder="Ex: Lovable" className="border-[#E2D5C0]" />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-[#443E35]">O que você queria fazer? *</Label>
            <Textarea
              required
              rows={2}
              placeholder="Ex: Queria cadastrar um ingrediente e calcular o custo"
              className="border-[#E2D5C0] resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-[#443E35]">O que aconteceu? *</Label>
            <Textarea
              required
              rows={3}
              placeholder="Descreva o erro ou problema com o máximo de detalhes"
              className="border-[#E2D5C0] resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-[#443E35]">Prompt que você usou (se tiver)</Label>
            <Textarea
              rows={4}
              placeholder="Cole o prompt que enviou para a ferramenta"
              className="border-[#E2D5C0] resize-none font-mono text-xs"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#235139] hover:bg-[#1B3D2E] text-white"
          >
            {loading ? 'Enviando…' : 'Enviar trava'}
          </Button>
        </form>
      </div>

      <div className="rounded-lg bg-[#F5EEE1] p-4 text-sm text-[#6F6657]">
        <p>
          <strong className="text-[#443E35]">Prefere o WhatsApp?</strong>{' '}
          Entre no grupo da comunidade para suporte mais rápido e troca com outros restaurantes.
        </p>
      </div>
    </div>
  )
}
