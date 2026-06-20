'use client'

import type { GeneratedPackage } from '@/types/database'
import { LovableSetupWizard } from '@/components/recipes/LovableSetupWizard'

interface RecipeViewerProps {
  recipe: GeneratedPackage
  moduleName?: string
}

/** @deprecated Use LovableSetupWizard directly */
export function RecipeViewer({ recipe, moduleName }: RecipeViewerProps) {
  const name =
    moduleName ??
    recipe.package_title.replace(/^Pacote — (Base \+ )?/, '')

  return <LovableSetupWizard package={recipe} moduleName={name} />
}
