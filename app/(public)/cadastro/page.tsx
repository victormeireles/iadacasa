'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from '@/lib/supabase/client'

export default function CadastroPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password.length < 8) {
      toast.error('A senha deve ter pelo menos 8 caracteres.')
      return
    }
    setLoading(true)

    const supabase = createClient()

    if (!supabase) {
      // Mock mode
      toast.success('Conta criada! Bem-vindo à IA da Casa.')
      router.push('/app/dashboard')
      return
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    })

    if (error) {
      toast.error(error.message)
      setLoading(false)
      return
    }

    toast.success('Conta criada! Verifique seu e-mail para confirmar.')
    router.push('/app/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#FBF7F0] flex flex-col">
      <header className="border-b border-[#E2D5C0] bg-[#FFFDF9]">
        <div className="mx-auto flex h-14 max-w-6xl items-center px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#235139]">
              <span className="text-[10px] font-bold text-white">IA</span>
            </div>
            <span className="font-semibold text-[#211E19]" style={{ fontFamily: 'var(--font-young-serif, serif)' }}>
              IA da Casa
            </span>
          </Link>
        </div>
      </header>

      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-[#211E19] mb-2">Crie sua conta</h1>
            <p className="text-sm text-[#6F6657]">
              Já tem conta?{' '}
              <Link href="/login" className="text-[#235139] hover:underline font-medium">
                Entrar
              </Link>
            </p>
          </div>

          <div className="rounded-[18px] border border-[#E2D5C0] bg-[#FFFDF9] p-7 shadow-[0_1px_3px_rgba(33,30,25,0.08)]">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-sm font-medium text-[#443E35]">Seu nome</Label>
                <Input
                  id="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Como podemos te chamar?"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="border-[#E2D5C0] focus:border-[#235139]"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm font-medium text-[#443E35]">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="seu@email.com.br"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="border-[#E2D5C0] focus:border-[#235139]"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-sm font-medium text-[#443E35]">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  autoComplete="new-password"
                  placeholder="Mínimo 8 caracteres"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="border-[#E2D5C0] focus:border-[#235139]"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#235139] hover:bg-[#1B3D2E] text-white"
              >
                {loading ? 'Criando conta…' : 'Criar conta grátis'}
              </Button>
            </form>
          </div>

          <p className="mt-4 text-center text-xs text-[#968C7B]">
            Ao criar sua conta, você concorda com nossos{' '}
            <Link href="/termos" className="hover:underline">Termos de Uso</Link>
            {' '}e{' '}
            <Link href="/privacidade" className="hover:underline">Política de Privacidade</Link>.
          </p>
        </div>
      </div>
    </div>
  )
}
