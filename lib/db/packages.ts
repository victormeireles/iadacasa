import { createServerSupabaseClient } from '@/lib/supabase/server'
import {
  packageNeedsFileRepair,
  rebuildPackageFiles,
} from '@/lib/services/repair-package-files'
import type { GeneratedPackage } from '@/types/database'

export async function getPackagesByRestaurant(restaurantId: string): Promise<GeneratedPackage[]> {
  const supabase = await createServerSupabaseClient()
  if (!supabase) return []

  const { data } = await supabase
    .from('generated_packages')
    .select('*, modules(name, slug)')
    .eq('restaurant_id', restaurantId)
    .eq('status', 'active')
    .order('generated_at', { ascending: false })

  return (data as GeneratedPackage[]) ?? []
}

export async function getPackageById(id: string): Promise<GeneratedPackage | null> {
  const supabase = await createServerSupabaseClient()
  if (!supabase) return null

  const { data } = await supabase
    .from('generated_packages')
    .select('*, modules(name, slug)')
    .eq('id', id)
    .single()

  return (data as GeneratedPackage) ?? null
}

async function repairAndPersistPackage(
  pkg: GeneratedPackage & { module_name?: string; module_slug?: string },
): Promise<GeneratedPackage & { module_name?: string; module_slug?: string }> {
  if (!packageNeedsFileRepair(pkg)) return pkg

  const rebuilt = await rebuildPackageFiles(pkg, {
    name: pkg.module_name,
    slug: pkg.module_slug,
  })
  if (!rebuilt) return pkg

  const supabase = await createServerSupabaseClient()
  if (!supabase) {
    return {
      ...pkg,
      files_json: rebuilt.files,
      prompt_for_external_tool: rebuilt.prompt_for_external_tool,
      package_markdown: rebuilt.package_markdown,
    }
  }

  const { data } = await supabase
    .from('generated_packages')
    .update({
      files_json: rebuilt.files,
      prompt_for_external_tool: rebuilt.prompt_for_external_tool,
      package_markdown: rebuilt.package_markdown,
    })
    .eq('id', pkg.id)
    .select('*, modules(name, slug)')
    .single()

  if (!data) {
    return {
      ...pkg,
      files_json: rebuilt.files,
      prompt_for_external_tool: rebuilt.prompt_for_external_tool,
      package_markdown: rebuilt.package_markdown,
    }
  }

  const modules = data.modules as { name?: string; slug?: string } | { name?: string; slug?: string }[] | null
  const moduleRecord = Array.isArray(modules) ? modules[0] : modules

  return {
    ...(data as GeneratedPackage),
    module_name: moduleRecord?.name,
    module_slug: moduleRecord?.slug,
  }
}

export async function getPackageByIdForUser(
  packageId: string,
  userId: string,
): Promise<(GeneratedPackage & { module_name?: string; module_slug?: string }) | null> {
  const supabase = await createServerSupabaseClient()
  if (!supabase) return null

  const { data } = await supabase
    .from('generated_packages')
    .select('*, modules(name, slug)')
    .eq('id', packageId)
    .eq('user_id', userId)
    .single()

  if (!data) return null

  const modules = data.modules as { name?: string; slug?: string } | { name?: string; slug?: string }[] | null
  const moduleRecord = Array.isArray(modules) ? modules[0] : modules

  const pkg = {
    ...(data as GeneratedPackage),
    module_name: moduleRecord?.name,
    module_slug: moduleRecord?.slug,
  }

  return repairAndPersistPackage(pkg)
}

export async function getAllPackages(): Promise<Array<GeneratedPackage & { module_name?: string; restaurant_name?: string }>> {
  const supabase = await createServerSupabaseClient()
  if (!supabase) return []

  const { data } = await supabase
    .from('generated_packages')
    .select('*, modules(name, slug), restaurants(name)')
    .eq('status', 'active')
    .order('generated_at', { ascending: false })

  if (!data) return []

  return data.map((p: Record<string, unknown>) => ({
    ...(p as unknown as GeneratedPackage),
    module_name: (p.modules as { name?: string } | null)?.name,
    restaurant_name: (p.restaurants as { name?: string } | null)?.name,
  }))
}
