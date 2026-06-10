'use client'

import { ArrowRight, Clock, Zap } from 'lucide-react'
import { cn, getModuleColors, MODULE_STATUS_LABELS, DIFFICULTY_LABELS } from '@/lib/utils'
import type { Module } from '@/types/database'

interface SolutionCardProps {
  module: Module
  installationStatus?: string
  onClick?: () => void
}

const MODULE_ICONS: Record<string, string> = {
  'clipboard-list': '📋',
  'cooking-pot': '🍳',
  'package': '📦',
  'shopping-cart': '🛒',
  'list-checks': '✅',
  'wallet': '💼',
}

export function SolutionCard({ module, installationStatus, onClick }: SolutionCardProps) {
  const colors = getModuleColors(module.color_key)
  const isAvailable = module.status === 'active'
  const isComingSoon = module.status === 'coming_soon'

  return (
    <button
      onClick={isAvailable ? onClick : undefined}
      disabled={!isAvailable}
      className={cn(
        'group relative w-full rounded-[18px] border text-left transition-all duration-200',
        'bg-[#FFFDF9] border-[#E2D5C0] shadow-[0_1px_3px_rgba(33,30,25,0.08)]',
        isAvailable && 'cursor-pointer hover:shadow-[0_4px_12px_rgba(33,30,25,0.12)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99]',
        !isAvailable && 'cursor-default opacity-75',
      )}
    >
      <div className="p-5">
        {/* Icon + Status */}
        <div className="flex items-start justify-between mb-4">
          <div className={cn('flex h-11 w-11 items-center justify-center rounded-xl text-xl', colors.bg)}>
            {MODULE_ICONS[module.icon ?? ''] ?? '⚡'}
          </div>

          <span className={cn(
            'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
            isAvailable && 'bg-[#DEEBE1] text-[#235139]',
            isComingSoon && 'bg-[#F5EEE1] text-[#6F6657]',
          )}>
            {MODULE_STATUS_LABELS[module.status]}
          </span>
        </div>

        {/* Content */}
        <h3 className="font-semibold text-[#211E19] text-base mb-1.5 leading-snug">
          {module.name}
        </h3>
        <p className="text-sm text-[#6F6657] leading-relaxed mb-4">
          {module.short_description}
        </p>

        {/* Pain */}
        <div className="rounded-lg bg-[#F5EEE1] px-3 py-2 mb-4">
          <p className="text-xs text-[#6F6657]">
            <span className="font-medium text-[#443E35]">Resolve: </span>
            {module.pain}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-[#968C7B]">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {module.estimated_time}
            </span>
            <span className="flex items-center gap-1">
              <Zap className="h-3 w-3" />
              {DIFFICULTY_LABELS[module.difficulty_level]}
            </span>
          </div>

          {isAvailable && (
            <span className={cn(
              'flex items-center gap-1 text-xs font-medium transition-colors',
              colors.text,
              'group-hover:gap-2'
            )}>
              Começar
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          )}
        </div>

        {/* Installation status badge */}
        {installationStatus && installationStatus !== 'not_started' && (
          <div className="mt-3 pt-3 border-t border-[#E2D5C0]">
            <span className="text-xs text-[#235139] font-medium">
              ● {installationStatus}
            </span>
          </div>
        )}
      </div>
    </button>
  )
}
