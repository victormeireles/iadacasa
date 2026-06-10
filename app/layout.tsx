import type { Metadata } from 'next'
import { Hanken_Grotesk, Young_Serif, JetBrains_Mono } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const hankenGrotesk = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken',
  display: 'swap',
})

const youngSerif = Young_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-young-serif',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'IA da Casa — Crie seu sistema de gestão com IA',
  description:
    'Plataforma para donos de restaurantes criarem seus próprios sistemas de gestão personalizados com IA. Começa pela sua maior dor.',
  keywords: ['restaurante', 'gestão', 'IA', 'ficha técnica', 'sistema personalizado'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${hankenGrotesk.variable} ${youngSerif.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FBF7F0]" style={{ fontFamily: 'var(--font-hanken, Hanken Grotesk, sans-serif)' }}>
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  )
}
