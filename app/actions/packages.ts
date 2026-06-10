'use server'

import { createServerSupabaseClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { generatePackage } from '@/lib/services/package-generator'
import { getBlocksByType } from '@/lib/db/knowledge-blocks'
import type { GeneratedPackage, ChecklistItem } from '@/types/database'

export interface GeneratePackageInput {
  restaurantId: string
  moduleId: string
  moduleName: string
  moduleSlug: string
  restaurantName: string
  segment: string
  baseAnswers: Record<string, unknown>
  moduleAnswers: Record<string, unknown>
  installedModules: Array<{ name: string; version: string }>
}

export async function generateAndSavePackage(input: GeneratePackageInput) {
  const supabase = await createServerSupabaseClient()
  if (!supabase) return { error: 'Supabase não configurado' }

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Não autenticado' }

  // Save base answers
  await supabase.from('client_module_answers').upsert({
    restaurant_id: input.restaurantId,
    module_id: null,
    user_id: user.id,
    answers_json: input.baseAnswers,
  }, { onConflict: 'restaurant_id,module_id' })

  // Save module answers
  await supabase.from('client_module_answers').upsert({
    restaurant_id: input.restaurantId,
    module_id: input.moduleId,
    user_id: user.id,
    answers_json: input.moduleAnswers,
  }, { onConflict: 'restaurant_id,module_id' })

  // Get real knowledge blocks from DB
  const globalRuleBlocks = await getBlocksByType('global_rule')
  const globalRules = globalRuleBlocks.map(b => b.content_markdown).join('\n\n---\n\n')

  // Generate recipe
  const recipe = await generatePackage({
    restaurantId: input.restaurantId,
    userId: user.id,
    moduleId: input.moduleId,
    moduleName: input.moduleName,
    moduleSlug: input.moduleSlug,
    restaurantName: input.restaurantName,
    segment: input.segment,
    baseAnswers: input.baseAnswers,
    moduleAnswers: input.moduleAnswers,
    installedModules: input.installedModules,
  })

  // Save package to DB
  const { data: pkg, error } = await supabase
    .from('generated_packages')
    .insert({
      restaurant_id: input.restaurantId,
      module_id: input.moduleId,
      user_id: user.id,
      package_title: recipe.title,
      package_markdown: recipe.markdown,
      prompt_for_external_tool: recipe.promptForExternalTool,
      checklist_json: recipe.checklist,
      source_blocks_json: { block_ids: recipe.sourceBlockIds },
      client_context_snapshot: recipe.contextSnapshot,
      module_answers_snapshot: {
        base: input.baseAnswers,
        module: input.moduleAnswers,
      },
      status: 'active',
    })
    .select()
    .single()

  if (error) return { error: error.message }

  // Update installation status
  await supabase.from('user_module_installations').upsert({
    restaurant_id: input.restaurantId,
    module_id: input.moduleId,
    status: 'package_generated',
    generated_at: new Date().toISOString(),
    generated_package_id: (pkg as GeneratedPackage).id,
  }, { onConflict: 'restaurant_id,module_id' })

  revalidatePath('/app/receitas-do-sistema')
  revalidatePath('/app/dashboard')

  return { data: pkg as GeneratedPackage }
}

export async function updateChecklist(packageId: string, checklist: ChecklistItem[]) {
  const supabase = await createServerSupabaseClient()
  if (!supabase) return { error: 'Supabase não configurado' }

  const { error } = await supabase
    .from('generated_packages')
    .update({ checklist_json: checklist })
    .eq('id', packageId)

  if (error) return { error: error.message }
  return { success: true }
}
