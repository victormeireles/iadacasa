'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { GeneratedPackage, ChecklistItem } from '@/types/database'
import ReactMarkdown from 'react-markdown'

interface RecipeViewerProps {
  recipe: GeneratedPackage
  onChecklistUpdate?: (items: ChecklistItem[]) => void
}

export function RecipeViewer({ recipe, onChecklistUpdate }: RecipeViewerProps) {
  const [activeTab, setActiveTab] = useState<'recipe' | 'prompt' | 'checklist'>('recipe')
  const [checklist, setChecklist] = useState<ChecklistItem[]>(recipe.checklist_json)
  const [promptCopied, setPromptCopied] = useState(false)

  function toggleChecklistItem(id: string) {
    const updated = checklist.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    )
    setChecklist(updated)
    onChecklistUpdate?.(updated)
  }

  function copyPrompt() {
    navigator.clipboard.writeText(recipe.prompt_for_external_tool)
    setPromptCopied(true)
    setTimeout(() => setPromptCopied(false), 2500)
  }

  const completedCount = checklist.filter(i => i.completed).length
  const totalCount = checklist.length

  return (
    <div className="space-y-6">
      {/* Success header */}
      <div className="rounded-[18px] border border-[#C3DAC9] bg-[#DEEBE1] p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#235139]">
            <Check className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-[#143025] text-lg leading-tight mb-1">
              {recipe.package_title}
            </h2>
            <p className="text-sm text-[#235139]">
              Sua Receita do Sistema está pronta. Copie o prompt e cole na ferramenta externa para começar.
            </p>
          </div>
        </div>

        {/* Warning */}
        <div className="mt-4 rounded-lg border border-[#C3DAC9] bg-[#FFFDF9] p-3">
          <p className="text-xs text-[#443E35]">
            ⚠️ <strong>Ferramenta externa paga por fora.</strong> A IA da Casa guia a construção, mas você
            usará sua própria conta no Lovable (ou ferramenta similar). Custos dessa ferramenta não estão inclusos.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-lg bg-[#F5EEE1] p-1">
        {[
          { id: 'recipe', label: 'Receita completa' },
          { id: 'prompt', label: 'Prompt para copiar' },
          { id: 'checklist', label: `Checklist (${completedCount}/${totalCount})` },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={cn(
              'flex-1 rounded-md py-2 text-sm font-medium transition-colors',
              activeTab === tab.id
                ? 'bg-[#FFFDF9] text-[#235139] shadow-[0_1px_3px_rgba(33,30,25,0.08)]'
                : 'text-[#6F6657] hover:text-[#443E35]'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'recipe' && (
        <div className="rounded-[18px] border border-[#E2D5C0] bg-[#FFFDF9] p-6 shadow-[0_1px_3px_rgba(33,30,25,0.08)]">
          <article className="prose prose-sm max-w-none
            prose-headings:text-[#211E19] prose-headings:font-semibold
            prose-h1:text-xl prose-h2:text-base prose-h2:mt-6 prose-h2:mb-3
            prose-p:text-[#443E35] prose-p:leading-relaxed
            prose-li:text-[#443E35]
            prose-strong:text-[#211E19]
            prose-code:bg-[#F5EEE1] prose-code:text-[#235139] prose-code:rounded prose-code:px-1 prose-code:py-0.5 prose-code:text-xs
            prose-pre:bg-[#143025] prose-pre:text-[#F4FBF5] prose-pre:rounded-xl prose-pre:p-4
            prose-table:text-sm
            prose-th:text-[#211E19] prose-th:font-semibold prose-th:bg-[#F5EEE1]
            prose-td:text-[#443E35]
            prose-a:text-[#235139] prose-a:no-underline hover:prose-a:underline
          ">
            <ReactMarkdown>{recipe.package_markdown}</ReactMarkdown>
          </article>
        </div>
      )}

      {activeTab === 'prompt' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#6F6657]">
              Copie o prompt abaixo e cole diretamente no Lovable ou na ferramenta externa que você usa.
            </p>
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

          <div className="rounded-[18px] border border-[#C3DAC9] bg-[#143025] p-5 overflow-x-auto">
            <pre className="whitespace-pre-wrap text-sm text-[#F4FBF5] font-mono leading-relaxed">
              {recipe.prompt_for_external_tool}
            </pre>
          </div>

          <div className="rounded-lg bg-[#F9EFD6] border border-[#EDCD8A] p-3">
            <p className="text-xs text-[#A9761F]">
              💡 <strong>Dica:</strong> Antes de implementar, leia a resposta da ferramenta e confirme o plano.
              Só autorize a implementação depois de entender o que será criado.
            </p>
          </div>
        </div>
      )}

      {activeTab === 'checklist' && (
        <div className="rounded-[18px] border border-[#E2D5C0] bg-[#FFFDF9] p-6 shadow-[0_1px_3px_rgba(33,30,25,0.08)]">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-[#211E19]">Checklist de validação</h3>
            <div className="h-1.5 w-32 rounded-full bg-[#E2D5C0]">
              <div
                className="h-1.5 rounded-full bg-[#235139] transition-all"
                style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
              />
            </div>
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
                    : 'border-[#E2D5C0] bg-white text-[#443E35] hover:border-[#235139] hover:bg-[#ECF3ED]'
                )}
              >
                <span className={cn(
                  'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border-2 transition-colors',
                  item.completed ? 'border-[#235139] bg-[#235139]' : 'border-[#B9AE9B]'
                )}>
                  {item.completed && <Check className="h-2.5 w-2.5 text-white" />}
                </span>
                <span className={cn(item.completed && 'line-through opacity-70')}>
                  {item.text}
                </span>
              </button>
            ))}
          </div>

          {completedCount === totalCount && totalCount > 0 && (
            <div className="mt-4 rounded-lg bg-[#DEEBE1] border border-[#C3DAC9] p-3 text-center">
              <p className="text-sm font-medium text-[#235139]">
                🎉 Checklist completo! Parabéns, o módulo está validado.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
