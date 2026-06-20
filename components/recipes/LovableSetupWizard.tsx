'use client'

import { useState } from 'react'
import { Check, ChevronDown, Copy, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { PackageFileList } from '@/components/recipes/PackageFileList'
import { updateChecklist } from '@/app/actions/packages'
import type { ChecklistItem, GeneratedPackage } from '@/types/database'
import ReactMarkdown from 'react-markdown'

interface LovableSetupWizardProps {
  package: GeneratedPackage
  moduleName: string
}

type StepId = 'account' | 'files' | 'prompt' | 'validate'

function storageKey(packageId: string) {
  return `lovable-wizard:${packageId}`
}

function loadCompleted(packageId: string): Set<StepId> {
  if (typeof window === 'undefined') return new Set()
  try {
    const raw = localStorage.getItem(storageKey(packageId))
    if (!raw) return new Set()
    return new Set(JSON.parse(raw) as StepId[])
  } catch {
    return new Set()
  }
}

function saveCompleted(packageId: string, steps: Set<StepId>) {
  localStorage.setItem(storageKey(packageId), JSON.stringify([...steps]))
}

function initialWizardState(packageId: string, stepOrder: StepId[]) {
  const saved = loadCompleted(packageId)
  const firstIncomplete = stepOrder.find(s => !saved.has(s)) ?? stepOrder[stepOrder.length - 1]
  return { completed: saved, openStep: firstIncomplete }
}

export function LovableSetupWizard({ package: pkg, moduleName }: LovableSetupWizardProps) {
  const isFirstModule = pkg.guide_variant === 'first_module'
  const [files, setFiles] = useState(pkg.files_json ?? [])
  const [promptText, setPromptText] = useState(pkg.prompt_for_external_tool)

  const stepOrder: StepId[] = isFirstModule
    ? ['account', 'files', 'prompt', 'validate']
    : ['files', 'prompt', 'validate']

  const [completed, setCompleted] = useState<Set<StepId>>(
    () => initialWizardState(pkg.id, stepOrder).completed,
  )
  const [openStep, setOpenStep] = useState<StepId>(
    () => initialWizardState(pkg.id, stepOrder).openStep,
  )
  const [checklist, setChecklist] = useState<ChecklistItem[]>(pkg.checklist_json ?? [])
  const [promptCopied, setPromptCopied] = useState(false)

  function markDone(step: StepId) {
    const next = new Set(completed)
    next.add(step)
    setCompleted(next)
    saveCompleted(pkg.id, next)
    const idx = stepOrder.indexOf(step)
    if (idx < stepOrder.length - 1) {
      setOpenStep(stepOrder[idx + 1])
    }
  }

  function toggleChecklistItem(id: string) {
    const updated = checklist.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item,
    )
    setChecklist(updated)
    void updateChecklist(pkg.id, updated)
  }

  function copyPrompt() {
    navigator.clipboard.writeText(promptText)
    setPromptCopied(true)
    setTimeout(() => setPromptCopied(false), 2500)
  }

  const completedCount = stepOrder.filter(s => completed.has(s)).length
  const totalSteps = stepOrder.length
  const checklistDone = checklist.filter(i => i.completed).length

  const stepMeta: Record<StepId, { number: number; title: string }> = {
    account: { number: 1, title: 'Criar conta no Lovable' },
    files: { number: isFirstModule ? 2 : 1, title: 'Anexar arquivos' },
    prompt: { number: isFirstModule ? 3 : 2, title: 'Colar prompt e modo Planejar' },
    validate: { number: isFirstModule ? 4 : 3, title: 'Executar e validar' },
  }

  function renderStepBody(step: StepId) {
    switch (step) {
      case 'account':
        return (
          <div className="space-y-4">
            <p className="text-sm text-[#443E35] leading-relaxed">
              O Lovable é onde seu sistema será montado. Você usa sua própria conta — os custos da
              ferramenta não estão inclusos na IA da Casa.
            </p>
            <a href="https://lovable.dev" target="_blank" rel="noopener noreferrer">
              <Button className="bg-[#235139] hover:bg-[#1B3D2E] text-white">
                <ExternalLink className="mr-2 h-4 w-4" />
                Abrir lovable.dev
              </Button>
            </a>
            <p className="text-xs text-[#6F6657]">
              Clique em Sign up / Criar conta e use e-mail e senha.
            </p>
            <label className="flex items-start gap-3 cursor-pointer rounded-lg border border-[#E2D5C0] p-3 hover:bg-[#F5EEE1]">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 accent-[#235139]"
                checked={completed.has('account')}
                onChange={() => markDone('account')}
              />
              <span className="text-sm text-[#443E35]">Já criei minha conta (ou já tenho)</span>
            </label>
          </div>
        )

      case 'files':
        return (
          <div className="space-y-5">
            <div>
              <p className="text-sm font-medium text-[#211E19] mb-3">Baixe os arquivos aqui</p>
              <PackageFileList
                files={files}
                packageId={pkg.id}
                showBaseHint={isFirstModule}
                onFilesUpdated={(updatedFiles, updatedPrompt) => {
                  setFiles(updatedFiles)
                  if (updatedPrompt) setPromptText(updatedPrompt)
                }}
              />
            </div>
            <div className="rounded-lg bg-[#F5EEE1] p-4 space-y-2">
              <p className="text-sm font-medium text-[#211E19]">No Lovable:</p>
              <ol className="list-decimal list-inside text-sm text-[#443E35] space-y-1">
                <li>Abra lovable.dev e entre no seu projeto (ou crie um novo)</li>
                <li>Na tela inicial, clique em <strong>+</strong></li>
                <li>Escolha <strong>Anexar</strong> → <strong>Arquivo</strong></li>
                <li>Selecione os arquivos que você baixou</li>
              </ol>
            </div>
            <label className="flex items-start gap-3 cursor-pointer rounded-lg border border-[#E2D5C0] p-3 hover:bg-[#F5EEE1]">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 accent-[#235139]"
                checked={completed.has('files')}
                onChange={() => markDone('files')}
              />
              <span className="text-sm text-[#443E35]">Anexei os arquivos no Lovable</span>
            </label>
          </div>
        )

      case 'prompt':
        return (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-[#6F6657]">Copie e cole no campo de mensagem do Lovable.</p>
              <Button
                onClick={copyPrompt}
                className="shrink-0 bg-[#235139] hover:bg-[#1B3D2E] text-white"
              >
                {promptCopied ? (
                  <><Check className="mr-2 h-4 w-4" /> Copiado!</>
                ) : (
                  <><Copy className="mr-2 h-4 w-4" /> Copiar prompt</>
                )}
              </Button>
            </div>
            <div className="rounded-xl border border-[#C3DAC9] bg-[#143025] p-4 overflow-x-auto">
              <pre className="whitespace-pre-wrap text-sm text-[#F4FBF5] font-mono leading-relaxed">
                {promptText}
              </pre>
            </div>
            <ol className="list-decimal list-inside text-sm text-[#443E35] space-y-1">
              <li>Cole o texto no campo de mensagem</li>
              <li>Selecione o modo <strong>Planejar</strong></li>
              <li>Envie e leia o plano antes de autorizar a implementação</li>
            </ol>
            <label className="flex items-start gap-3 cursor-pointer rounded-lg border border-[#E2D5C0] p-3 hover:bg-[#F5EEE1]">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 accent-[#235139]"
                checked={completed.has('prompt')}
                onChange={() => markDone('prompt')}
              />
              <span className="text-sm text-[#443E35]">Colei o prompt e enviei em modo Planejar</span>
            </label>
          </div>
        )

      case 'validate':
        return (
          <div className="space-y-5">
            <p className="text-sm text-[#443E35]">
              Depois de revisar o plano no Lovable, autorize a implementação. Em seguida, valide aqui.
            </p>
            <label className="flex items-start gap-3 cursor-pointer rounded-lg border border-[#E2D5C0] p-3 hover:bg-[#F5EEE1]">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 accent-[#235139]"
                checked={completed.has('validate')}
                onChange={() => markDone('validate')}
              />
              <span className="text-sm text-[#443E35]">O Lovable terminou de implementar</span>
            </label>

            <div>
              <div className="mb-3 flex items-center justify-between">
                <h4 className="font-medium text-[#211E19]">Checklist de validação</h4>
                <span className="text-xs text-[#6F6657]">{checklistDone}/{checklist.length}</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-[#E2D5C0] mb-4">
                <div
                  className="h-1.5 rounded-full bg-[#235139] transition-all"
                  style={{
                    width: `${checklist.length > 0 ? (checklistDone / checklist.length) * 100 : 0}%`,
                  }}
                />
              </div>
              <div className="space-y-2">
                {checklist.map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleChecklistItem(item.id)}
                    className={cn(
                      'flex w-full items-start gap-3 rounded-lg border p-3 text-left text-sm transition-colors',
                      item.completed
                        ? 'border-[#C3DAC9] bg-[#ECF3ED] text-[#235139]'
                        : 'border-[#E2D5C0] bg-white text-[#443E35] hover:border-[#235139]',
                    )}
                  >
                    <span
                      className={cn(
                        'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border-2',
                        item.completed ? 'border-[#235139] bg-[#235139]' : 'border-[#B9AE9B]',
                      )}
                    >
                      {item.completed && <Check className="h-2.5 w-2.5 text-white" />}
                    </span>
                    <span className={cn(item.completed && 'line-through opacity-70')}>{item.text}</span>
                  </button>
                ))}
              </div>
              {checklistDone === checklist.length && checklist.length > 0 && (
                <div className="mt-4 rounded-lg bg-[#DEEBE1] border border-[#C3DAC9] p-3 text-center">
                  <p className="text-sm font-medium text-[#235139]">
                    Checklist completo! Parabéns, o módulo está validado.
                  </p>
                </div>
              )}
            </div>
          </div>
        )
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[18px] border border-[#C3DAC9] bg-[#DEEBE1] p-6">
        <h2 className="font-semibold text-[#143025] text-lg mb-1">{pkg.package_title}</h2>
        <p className="text-sm text-[#235139] mb-4">
          Pacote pronto para <strong>{moduleName}</strong>. Siga os passos para montar no Lovable.
        </p>
        <div className="flex items-center gap-2 text-xs text-[#235139]">
          <span>Passo {Math.min(completedCount + 1, totalSteps)} de {totalSteps}</span>
          <div className="flex-1 h-1.5 rounded-full bg-[#C3DAC9]">
            <div
              className="h-1.5 rounded-full bg-[#235139] transition-all"
              style={{ width: `${(completedCount / totalSteps) * 100}%` }}
            />
          </div>
        </div>
        <div className="mt-4 rounded-lg border border-[#C3DAC9] bg-[#FFFDF9] p-3">
          <p className="text-xs text-[#443E35]">
            Ferramenta externa paga por fora. Você usa sua própria conta no Lovable.
          </p>
        </div>
      </div>

      <details className="rounded-lg border border-[#E2D5C0] bg-[#FFFDF9] p-4">
        <summary className="cursor-pointer text-sm font-medium text-[#211E19]">
          Ver resumo do pacote
        </summary>
        <article className="prose prose-sm max-w-none mt-3 prose-p:text-[#443E35]">
          <ReactMarkdown>{pkg.package_markdown}</ReactMarkdown>
        </article>
      </details>

      <div className="space-y-3">
        {stepOrder.map(step => {
          const meta = stepMeta[step]
          const isDone = completed.has(step)
          const isOpen = openStep === step

          return (
            <div
              key={step}
              className={cn(
                'rounded-[18px] border bg-[#FFFDF9] shadow-[0_1px_3px_rgba(33,30,25,0.08)] overflow-hidden',
                isOpen ? 'border-[#235139]' : 'border-[#E2D5C0]',
              )}
            >
              <button
                type="button"
                aria-current={isOpen ? 'step' : undefined}
                className="flex w-full items-center gap-3 p-4 text-left"
                onClick={() => setOpenStep(step)}
              >
                <span
                  className={cn(
                    'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold',
                    isDone ? 'bg-[#235139] text-white' : 'bg-[#DEEBE1] text-[#235139]',
                  )}
                >
                  {isDone ? <Check className="h-4 w-4" /> : meta.number}
                </span>
                <span className="flex-1 font-medium text-[#211E19]">{meta.title}</span>
                <ChevronDown
                  className={cn('h-4 w-4 text-[#6F6657] transition-transform', isOpen && 'rotate-180')}
                />
              </button>
              {isOpen && (
                <div className="border-t border-[#E2D5C0] px-4 pb-4 pt-2">
                  {renderStepBody(step)}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
