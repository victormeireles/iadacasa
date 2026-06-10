'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { createRestaurant } from '@/app/actions/restaurants'
import type { RestaurantSegment } from '@/types/database'

const SEGMENTS: Array<{ value: RestaurantSegment; label: string }> = [
  { value: 'hamburgueria', label: 'Hamburgueria' },
  { value: 'restaurante', label: 'Restaurante' },
  { value: 'pizzaria', label: 'Pizzaria' },
  { value: 'bar', label: 'Bar' },
  { value: 'cafeteria', label: 'Cafeteria' },
  { value: 'dark_kitchen', label: 'Dark kitchen / Delivery' },
  { value: 'delivery', label: 'Só delivery' },
  { value: 'outro', label: 'Outro' },
]

export default function RestaurantePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    segment: '' as RestaurantSegment,
    city: '',
    state: '',
    number_of_units: 1,
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.segment) { toast.error('Selecione o tipo do negócio'); return }
    setLoading(true)

    const result = await createRestaurant({
      name: form.name,
      segment: form.segment,
      city: form.city || undefined,
      state: form.state || undefined,
      number_of_units: form.number_of_units,
    })

    if (result.error) {
      toast.error(result.error)
      setLoading(false)
      return
    }

    toast.success('Restaurante cadastrado!')
    router.push('/app/dashboard')
    router.refresh()
  }

  return (
    <div className="max-w-lg space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-[#968C7B] mb-2">
          Primeiros passos
        </p>
        <h1 className="text-2xl font-semibold text-[#211E19] mb-2">
          Conta um pouco sobre o seu negócio
        </h1>
        <p className="text-[#6F6657] leading-relaxed">
          Essas informações ajudam a personalizar tudo para a sua operação.
        </p>
      </div>

      <div className="rounded-[18px] border border-[#E2D5C0] bg-[#FFFDF9] p-6 shadow-[0_1px_3px_rgba(33,30,25,0.08)]">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-[#443E35]">
              Nome do restaurante *
            </Label>
            <Input
              required
              placeholder="Ex: Stela Burger"
              value={form.name}
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              className="border-[#E2D5C0] focus:border-[#235139]"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-[#443E35]">
              Tipo do negócio *
            </Label>
            <Select
              value={form.segment}
              onValueChange={v => setForm(p => ({ ...p, segment: v as RestaurantSegment }))}
            >
              <SelectTrigger className="border-[#E2D5C0]">
                <SelectValue placeholder="Selecione…" />
              </SelectTrigger>
              <SelectContent>
                {SEGMENTS.map(s => (
                  <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-[#443E35]">Cidade</Label>
              <Input
                placeholder="São Paulo"
                value={form.city}
                onChange={e => setForm(p => ({ ...p, city: e.target.value }))}
                className="border-[#E2D5C0]"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-[#443E35]">Estado</Label>
              <Input
                placeholder="SP"
                maxLength={2}
                value={form.state}
                onChange={e => setForm(p => ({ ...p, state: e.target.value.toUpperCase() }))}
                className="border-[#E2D5C0]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-[#443E35]">
              Quantas lojas / unidades?
            </Label>
            <Select
              value={String(form.number_of_units)}
              onValueChange={v => setForm(p => ({ ...p, number_of_units: Number(v) }))}
            >
              <SelectTrigger className="border-[#E2D5C0]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Só uma</SelectItem>
                <SelectItem value="2">2 lojas</SelectItem>
                <SelectItem value="3">3 lojas</SelectItem>
                <SelectItem value="4">4 ou mais</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#235139] hover:bg-[#1B3D2E] text-white"
          >
            {loading ? 'Cadastrando…' : 'Salvar e continuar →'}
          </Button>
        </form>
      </div>
    </div>
  )
}
