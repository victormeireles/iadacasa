import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(date))
}

export function formatDateTime(date: string | Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length).trim() + '…'
}

export const MODULE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  ficha:      { bg: 'bg-[#DEEBE1]', text: 'text-[#235139]', border: 'border-[#235139]' },
  receitas:   { bg: 'bg-[#F6E0D3]', text: 'text-[#B25A38]', border: 'border-[#B25A38]' },
  estoque:    { bg: 'bg-[#F9EFD6]', text: 'text-[#C28C2A]', border: 'border-[#C28C2A]' },
  compras:    { bg: 'bg-[#EDD7DB]', text: 'text-[#6E2A38]', border: 'border-[#6E2A38]' },
  checklist:  { bg: 'bg-[#DCEAE5]', text: 'text-[#4E7E6F]', border: 'border-[#4E7E6F]' },
  financeiro: { bg: 'bg-[#EDE3D2]', text: 'text-[#322D26]', border: 'border-[#322D26]' },
}

export function getModuleColors(colorKey?: string) {
  return MODULE_COLORS[colorKey ?? 'ficha'] ?? MODULE_COLORS.ficha
}

export const INSTALLATION_STATUS_LABELS: Record<string, string> = {
  not_started: 'Não iniciado',
  diagnostic_started: 'Diagnóstico iniciado',
  diagnostic_completed: 'Diagnóstico concluído',
  package_generated: 'Receita gerada',
  implementation_started: 'Implementação iniciada',
  installed: 'Instalado',
  validated: 'Validado',
  needs_adjustment: 'Precisa de ajuste',
  archived: 'Arquivado',
}

export const MODULE_STATUS_LABELS: Record<string, string> = {
  draft: 'Rascunho',
  active: 'Disponível',
  coming_soon: 'Em breve',
  archived: 'Arquivado',
}

export const DIFFICULTY_LABELS: Record<string, string> = {
  basico: 'Básico',
  intermediario: 'Intermediário',
  avancado: 'Avançado',
}
