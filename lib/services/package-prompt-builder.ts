import type { BuildExternalPromptInput } from '@/types/packages'

const PLANNING_STEPS = `1. O que você entendeu da solicitação
2. O que encontrou no projeto atual
3. O que pretende reutilizar
4. O que pretende criar
5. O que pretende alterar
6. Quais riscos existem`

export function buildExternalPrompt(input: BuildExternalPromptInput): string {
  const fileList = input.files.map(f => `- ${f.filename}`).join('\n')
  const blockFiles = input.files.filter(f => f.knowledge_block_id !== null)
  const blockNames = blockFiles.map(f => `- ${f.filename}`).join('\n')

  if (input.guideVariant === 'first_module') {
    return `Você está implementando o módulo **${input.moduleName}** para o restaurante **${input.restaurantName}**.

Anexei os seguintes arquivos de contexto — leia todos antes de responder:
${fileList}

**Importante:** mantenha os arquivos de base e regras neste projeto. Eles serão consultados em módulos futuros.

**Não implemente nada ainda.**

Estou usando o modo **Planejar**. Responda com:
${PLANNING_STEPS}

Aguarde minha confirmação explícita antes de implementar.`.trim()
  }

  return `Você está implementando o módulo **${input.moduleName}** para o restaurante **${input.restaurantName}**.

Os arquivos de base e regras globais já devem estar salvos neste projeto (implementados em módulo anterior pela metodologia IA da Casa). Consulte-os antes de criar estruturas novas.

Anexei apenas os arquivos deste módulo:
${blockNames}

**Não implemente nada ainda.**

Estou usando o modo **Planejar**. Responda com:
${PLANNING_STEPS}

Aguarde minha confirmação explícita antes de implementar.`.trim()
}
