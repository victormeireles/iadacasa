import { NextResponse } from 'next/server'
import { getPublicModules } from '@/lib/db/modules'

export async function GET() {
  const modules = await getPublicModules()
  return NextResponse.json(modules)
}
