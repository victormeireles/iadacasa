'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SolutionCard } from '@/components/modules/SolutionCard'
import type { Module } from '@/types/database'

export default function SolucoesPage() {
  const router = useRouter()
  const [modules, setModules] = useState<Module[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/modules')
      .then(r => r.json())
      .then(data => { setModules(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-[#968C7B] mb-2">
          Cardápio de soluções
        </p>
        <h1 className="text-2xl font-semibold text-[#211E19] mb-2">
          Qual dor você quer resolver primeiro?
        </h1>
        <p className="text-[#6F6657] max-w-xl leading-relaxed">
          Cada módulo é uma solução prática para uma dor real da operação.
          Comece pela que mais atrapalha o seu dia a dia.
        </p>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-56 rounded-[18px] bg-[#F5EEE1] animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map(module => (
            <SolutionCard
              key={module.id}
              module={module}
              onClick={() => router.push(`/app/solucoes/${module.slug}`)}
            />
          ))}
        </div>
      )}

      <div className="rounded-[18px] border border-[#E2D5C0] bg-[#FFFDF9] p-5 shadow-[0_1px_3px_rgba(33,30,25,0.08)]">
        <div className="flex items-start gap-3">
          <span className="text-lg">💡</span>
          <div>
            <p className="text-sm font-medium text-[#211E19] mb-1">Como funciona</p>
            <p className="text-sm text-[#6F6657] leading-relaxed">
              Escolha um módulo, responda algumas perguntas sobre o seu negócio e a IA da Casa
              gera uma <strong>Receita do Sistema</strong> personalizada — com regras de negócio,
              telas e um prompt pronto para você montar no Lovable.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
