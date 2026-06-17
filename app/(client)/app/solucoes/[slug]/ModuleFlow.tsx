'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, Loader2, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'
import { DiagnosticForm } from '@/components/forms/DiagnosticForm'
import { RecipeViewer } from '@/components/recipes/RecipeViewer'
import { generateAndSavePackage } from '@/app/actions/packages'
import { getModuleColors } from '@/lib/utils'
import type { Module, DiagnosticQuestion, Restaurant, GeneratedPackage } from '@/types/database'

type FlowStep = 'intro' | 'base-diagnostic' | 'module-diagnostic' | 'generating' | 'recipe'

interface ModuleFlowProps {
  module: Module
  baseQuestions: DiagnosticQuestion[]
  moduleQuestions: DiagnosticQuestion[]
  restaurant: Restaurant
  userId: string
}

export function ModuleFlow({ module, baseQuestions, moduleQuestions, restaurant }: ModuleFlowProps) {
  const router = useRouter()
  const [step, setStep] = useState<FlowStep>('intro')
  const [baseAnswers, setBaseAnswers] = useState<Record<string, unknown>>({})
  const [generatedPackage, setGeneratedPackage] = useState<GeneratedPackage | null>(null)
  const colors = getModuleColors(module.color_key)

  const isComingSoon = module.status === 'coming_soon'

  if (isComingSoon) {
    return (
      <div className="max-w-xl">
        <Link href="/app/solucoes" className="inline-flex items-center gap-1.5 text-sm text-[#6F6657] hover:text-[#443E35] mb-6 transition-colors">
          <ChevronLeft className="h-4 w-4" />
          Cardápio de soluções
        </Link>
        <div className="rounded-[18px] border border-[#E2D5C0] bg-[#FFFDF9] p-8 text-center shadow-[0_1px_3px_rgba(33,30,25,0.08)]">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F5EEE1] mx-auto mb-5 text-2xl">🔔</div>
          <h1 className="text-xl font-semibold text-[#211E19] mb-2">{module.name}</h1>
          <p className="text-[#6F6657] mb-6">{module.short_description}</p>
          <p className="text-sm text-[#968C7B] mb-6">Este módulo está sendo preparado e em breve estará disponível.</p>
          <Link href="/app/solucoes">
            <button className="rounded-xl bg-[#235139] hover:bg-[#1B3D2E] text-white text-sm font-medium py-2.5 px-6 transition-colors">
              Ver módulos disponíveis
            </button>
          </Link>
        </div>
      </div>
    )
  }

  async function handleModuleDiagnosticSubmit(moduleAnswers: Record<string, unknown>) {
    setStep('generating')
    try {
      const result = await generateAndSavePackage({
        restaurantId: restaurant.id,
        moduleId: module.id,
        moduleName: module.name,
        moduleSlug: module.slug,
        restaurantName: restaurant.name,
        segment: restaurant.segment,
        baseAnswers,
        moduleAnswers,
      })

      if (result.error) throw new Error(result.error)

      setGeneratedPackage(result.data as GeneratedPackage)
      setStep('recipe')
      toast.success('Receita do Sistema gerada com sucesso!')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erro ao gerar a receita. Tente novamente.')
      setStep('module-diagnostic')
    }
  }

  return (
    <div className="space-y-6">
      {step !== 'recipe' && (
        <Link href="/app/solucoes" className="inline-flex items-center gap-1.5 text-sm text-[#6F6657] hover:text-[#443E35] transition-colors">
          <ChevronLeft className="h-4 w-4" />
          Cardápio de soluções
        </Link>
      )}

      {/* ── Intro ── */}
      {step === 'intro' && (
        <div className="max-w-2xl space-y-6">
          <div className="rounded-[18px] border border-[#E2D5C0] bg-[#FFFDF9] p-7 shadow-[0_1px_3px_rgba(33,30,25,0.08)]">
            <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl text-xl mb-5 ${colors.bg}`}>📋</div>
            <h1 className="text-2xl font-semibold text-[#211E19] mb-3">{module.name}</h1>
            <p className="text-[#6F6657] leading-relaxed mb-5">{module.short_description}</p>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="rounded-lg bg-[#F5EEE1] p-3">
                <p className="text-xs text-[#6F6657] mb-0.5">Resolve</p>
                <p className="text-sm font-medium text-[#443E35]">{module.pain}</p>
              </div>
              <div className="rounded-lg bg-[#F5EEE1] p-3">
                <p className="text-xs text-[#6F6657] mb-0.5">Resultado</p>
                <p className="text-sm font-medium text-[#443E35]">{module.expected_result}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-[#6F6657] mb-6">
              <span className="flex items-center gap-1.5 rounded-full bg-[#F5EEE1] px-3 py-1">⏱ {module.estimated_time}</span>
              <span className="flex items-center gap-1.5 rounded-full bg-[#F5EEE1] px-3 py-1 capitalize">⚡ {module.difficulty_level}</span>
            </div>
            <button
              onClick={() => setStep('base-diagnostic')}
              className="w-full rounded-xl bg-[#235139] hover:bg-[#1B3D2E] text-white font-semibold py-3 px-6 transition-colors flex items-center justify-center gap-2"
            >
              Começar diagnóstico
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="rounded-[18px] border border-[#E2D5C0] bg-[#FFFDF9] p-5 shadow-[0_1px_3px_rgba(33,30,25,0.08)]">
            <h3 className="font-semibold text-[#211E19] mb-4">O que vai acontecer</h3>
            <ol className="space-y-3">
              {[
                'Você responde perguntas sobre o seu restaurante (uma vez só)',
                `Você responde perguntas específicas sobre ${module.name}`,
                'A IA da Casa gera a Receita do Sistema personalizada',
                'Você copia o prompt e monta o módulo no Lovable',
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#443E35]">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#DEEBE1] text-[#235139] font-semibold text-xs mt-0.5">{i + 1}</span>
                  {text}
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-lg bg-[#F9EFD6] border border-[#EDCD8A] p-4">
            <p className="text-sm text-[#A9761F] leading-relaxed">
              <strong>Este é o seu primeiro módulo.</strong> A Receita do Sistema vai incluir a estrutura
              mínima do sistema (usuários, permissões, cadastros base) junto com o módulo escolhido.
            </p>
          </div>
        </div>
      )}

      {/* ── Base diagnosis ── */}
      {step === 'base-diagnostic' && (
        <div className="max-w-2xl">
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-[#211E19] mb-1">Vamos entender o seu negócio</h1>
            <p className="text-sm text-[#6F6657]">Essas informações ajudam a personalizar a solução. Você só responde isso uma vez.</p>
          </div>
          <DiagnosticForm
            questions={baseQuestions}
            stepTitle="Diagnóstico do seu restaurante"
            stepDescription="Conte um pouco sobre como funciona o seu negócio hoje."
            stepNumber={1}
            totalSteps={2}
            initialAnswers={{ restaurant_name: restaurant.name, segment: restaurant.segment }}
            onSubmit={(answers) => { setBaseAnswers(answers); setStep('module-diagnostic') }}
          />
        </div>
      )}

      {/* ── Module diagnosis ── */}
      {step === 'module-diagnostic' && (
        <div className="max-w-2xl">
          <div className="mb-6">
            <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium mb-3 ${colors.bg} ${colors.text}`}>
              {module.name}
            </div>
            <h1 className="text-xl font-semibold text-[#211E19] mb-1">Agora, sobre a {module.name}</h1>
            <p className="text-sm text-[#6F6657]">Suas respostas personalizam a Receita do Sistema para o seu restaurante.</p>
          </div>
          <DiagnosticForm
            questions={moduleQuestions}
            stepTitle={`Diagnóstico — ${module.name}`}
            stepDescription="Responda de acordo com a sua operação real. Não existe certo ou errado."
            stepNumber={2}
            totalSteps={2}
            onSubmit={handleModuleDiagnosticSubmit}
            onBack={() => setStep('base-diagnostic')}
          />
        </div>
      )}

      {/* ── Generating ── */}
      {step === 'generating' && (
        <div className="flex flex-col items-center justify-center py-20 gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#DEEBE1]">
            <Loader2 className="h-7 w-7 text-[#235139] animate-spin" />
          </div>
          <div className="text-center">
            <p className="font-semibold text-[#211E19] mb-1">Preparando sua Receita do Sistema</p>
            <p className="text-sm text-[#6F6657]">Combinando suas respostas com os documentos internos da IA da Casa…</p>
          </div>
        </div>
      )}

      {/* ── Recipe ── */}
      {step === 'recipe' && generatedPackage && (
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => router.push('/app/solucoes')} className="inline-flex items-center gap-1.5 text-sm text-[#6F6657] hover:text-[#443E35] transition-colors">
              <ChevronLeft className="h-4 w-4" />
              Cardápio
            </button>
            <span className="text-[#E2D5C0]">/</span>
            <span className="text-sm text-[#443E35]">Receita do Sistema</span>
          </div>
          <RecipeViewer recipe={generatedPackage} />
        </div>
      )}
    </div>
  )
}
