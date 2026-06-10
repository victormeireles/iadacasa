import Link from 'next/link'
import { ArrowRight, ChefHat, TrendingDown, Package, ClipboardList, Wallet, ListChecks } from 'lucide-react'
import { Button } from '@/components/ui/button'

const PAINS = [
  'Não sabe o custo real dos seus produtos',
  'Estoque desorganizado e cheio de perdas',
  'Receitas sem padronização — cada dia sai diferente',
  'Compras feitas no feeling, sem controle de fornecedor',
  'Falta de clareza sobre margem e resultado financeiro',
  'Controles espalhados em planilhas que ninguém atualiza',
]

const SOLUTIONS = [
  { icon: ClipboardList, name: 'Ficha Técnica e Custo', desc: 'Descubra o custo real de cada produto e controle sua margem.', status: 'Disponível', color: 'bg-[#DEEBE1] text-[#235139]' },
  { icon: ChefHat, name: 'Receitas Operacionais', desc: 'Padronize o preparo dos seus pratos com receitas detalhadas.', status: 'Em breve', color: 'bg-[#F5EEE1] text-[#6F6657]' },
  { icon: Package, name: 'Estoque de Insumos', desc: 'Controle entradas, saídas e evite falta de ingredientes.', status: 'Em breve', color: 'bg-[#F5EEE1] text-[#6F6657]' },
  { icon: TrendingDown, name: 'Compras', desc: 'Organize pedidos e compare preços de fornecedores.', status: 'Em breve', color: 'bg-[#F5EEE1] text-[#6F6657]' },
  { icon: ListChecks, name: 'Checklist de Operação', desc: 'Checklists de abertura e fechamento com registro de responsável.', status: 'Em breve', color: 'bg-[#F5EEE1] text-[#6F6657]' },
  { icon: Wallet, name: 'Financeiro Simples', desc: 'Visão clara do faturamento, custos e resultado do mês.', status: 'Em breve', color: 'bg-[#F5EEE1] text-[#6F6657]' },
]

const HOW_IT_WORKS = [
  { step: '01', title: 'Escolha sua maior dor', desc: 'Selecione o módulo que resolve o problema que mais atrapalha sua operação hoje.' },
  { step: '02', title: 'Responda algumas perguntas', desc: 'A IA da Casa entende seu restaurante: segmento, usuários, permissões e o que você precisa.' },
  { step: '03', title: 'Receba a Receita do Sistema', desc: 'Um plano completo com regras de negócio, telas, cadastros e prompt pronto para a ferramenta.' },
  { step: '04', title: 'Monte no Lovable', desc: 'Cole o prompt na sua conta do Lovable (ou ferramenta similar) e siga o passo a passo para construir.' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FBF7F0]">
      {/* ── Topbar ── */}
      <header className="sticky top-0 z-40 border-b border-[#E2D5C0] bg-[#FFFDF9]/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#235139]">
              <span className="text-xs font-bold text-white">IA</span>
            </div>
            <span className="font-semibold text-[#211E19]" style={{ fontFamily: 'var(--font-young-serif, serif)' }}>
              IA da Casa
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-[#6F6657] hover:text-[#235139] transition-colors">
              Entrar
            </Link>
            <Link href="/cadastro">
              <Button size="sm" className="bg-[#235139] hover:bg-[#1B3D2E] text-white">
                Começar grátis
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center rounded-full bg-[#DEEBE1] px-3 py-1 text-xs font-medium text-[#235139] mb-6 border border-[#C3DAC9]">
          ✦ Novo: módulo Ficha Técnica disponível
        </div>

        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-normal text-[#211E19] leading-tight mb-6 max-w-3xl mx-auto"
          style={{ fontFamily: 'var(--font-young-serif, serif)' }}
        >
          Crie um sistema de gestão{' '}
          <span className="text-[#235139]">sob medida</span>{' '}
          para o seu restaurante
        </h1>

        <p className="text-lg text-[#6F6657] max-w-2xl mx-auto mb-10 leading-relaxed">
          Seu restaurante não precisa se adaptar a um sistema genérico. Com IA, você cria uma gestão
          adaptada ao seu jeito de operar — começando pelas dores que mais atrapalham.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/cadastro">
            <Button size="lg" className="bg-[#235139] hover:bg-[#1B3D2E] text-white px-8">
              Quero criar meu sistema
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="#como-funciona">
            <Button size="lg" variant="outline" className="border-[#E2D5C0] text-[#443E35] hover:bg-[#F5EEE1]">
              Como funciona
            </Button>
          </Link>
        </div>

        <p className="mt-4 text-xs text-[#968C7B]">
          Sem cartão de crédito · Começa pelo módulo que você precisar
        </p>
      </section>

      {/* ── Pains ── */}
      <section className="bg-[#FFFDF9] border-y border-[#E2D5C0] py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#968C7B] mb-3">
              Você se identifica com alguma dessas situações?
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#211E19]">
              As dores mais comuns de quem gerencia um restaurante
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PAINS.map((pain, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl border border-[#E2D5C0] bg-[#FBF7F0] p-4">
                <div className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-[#EDD7DB] flex items-center justify-center">
                  <span className="text-[10px] font-bold text-[#6E2A38]">!</span>
                </div>
                <p className="text-sm text-[#443E35] leading-relaxed">{pain}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="como-funciona" className="py-16 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#968C7B] mb-3">Passo a passo</p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#211E19]">Como a IA da Casa funciona</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOW_IT_WORKS.map(({ step, title, desc }) => (
            <div key={step} className="rounded-[18px] border border-[#E2D5C0] bg-[#FFFDF9] p-6 shadow-[0_1px_3px_rgba(33,30,25,0.08)]">
              <div className="text-3xl font-normal text-[#E2D5C0] mb-3" style={{ fontFamily: 'var(--font-young-serif, serif)' }}>
                {step}
              </div>
              <h3 className="font-semibold text-[#211E19] mb-2">{title}</h3>
              <p className="text-sm text-[#6F6657] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-[18px] border border-[#E2D5C0] bg-[#FFFDF9] p-5 shadow-[0_1px_3px_rgba(33,30,25,0.08)]">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-[#F9EFD6] flex items-center justify-center text-[#A9761F] text-xs font-bold">i</div>
            <p className="text-sm text-[#443E35] leading-relaxed">
              <strong>Ferramenta externa paga por fora.</strong> A IA da Casa guia e gera o plano. A construção
              acontece no Lovable — você usa sua própria conta. Custos da ferramenta externa não estão inclusos.
            </p>
          </div>
        </div>
      </section>

      {/* ── Solutions ── */}
      <section className="bg-[#FFFDF9] border-y border-[#E2D5C0] py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#968C7B] mb-3">Cardápio de soluções</p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#211E19]">Comece pelo módulo que resolve sua maior dor</h2>
            <p className="mt-2 text-[#6F6657]">Cada módulo é uma solução prática para uma dor real da operação.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SOLUTIONS.map(({ icon: Icon, name, desc, status, color }) => (
              <div key={name} className="rounded-[18px] border border-[#E2D5C0] bg-[#FBF7F0] p-5 shadow-[0_1px_3px_rgba(33,30,25,0.08)]">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F5EEE1]">
                    <Icon className="h-5 w-5 text-[#443E35]" />
                  </div>
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${color}`}>{status}</span>
                </div>
                <h3 className="font-semibold text-[#211E19] mb-1">{name}</h3>
                <p className="text-sm text-[#6F6657] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 mx-auto max-w-6xl px-4 sm:px-6 text-center">
        <div className="rounded-[26px] bg-[#235139] p-10 sm:p-14">
          <h2
            className="text-3xl sm:text-4xl font-normal text-white mb-4 max-w-xl mx-auto leading-tight"
            style={{ fontFamily: 'var(--font-young-serif, serif)' }}
          >
            Pronto para criar o sistema do seu restaurante?
          </h2>
          <p className="text-[#8FB59C] max-w-lg mx-auto mb-8 leading-relaxed">
            Comece pelo módulo Ficha Técnica e Custo — disponível agora. Em 1 a 3 horas você terá
            um módulo funcionando, cadastrado na ferramenta da sua escolha.
          </p>
          <Link href="/cadastro">
            <Button size="lg" className="bg-[#D8A23E] hover:bg-[#C28C2A] text-[#211E19] font-semibold px-8">
              Criar minha conta
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <p className="mt-4 text-xs text-[#8FB59C]">Gratuito para começar · Sem compromisso</p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-[#E2D5C0] bg-[#FFFDF9] py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#235139]">
              <span className="text-[9px] font-bold text-white">IA</span>
            </div>
            <span className="text-sm font-semibold text-[#443E35]">IA da Casa</span>
          </div>
          <p className="text-xs text-[#968C7B]">© {new Date().getFullYear()} IA da Casa. Todos os direitos reservados.</p>
          <div className="flex gap-4 text-xs text-[#968C7B]">
            <Link href="/termos" className="hover:text-[#443E35] transition-colors">Termos</Link>
            <Link href="/privacidade" className="hover:text-[#443E35] transition-colors">Privacidade</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
