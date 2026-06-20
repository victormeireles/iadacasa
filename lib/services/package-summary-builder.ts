export function buildPackageSummary(params: {
  moduleName: string
  restaurantName: string
  isFirstModule: boolean
  blockTitles: string[]
}): string {
  const baseNote = params.isFirstModule
    ? 'Como este é seu primeiro módulo, o pacote inclui a estrutura base do sistema (usuários, permissões e cadastros fundamentais) junto com o módulo escolhido.\n\n'
    : ''

  const blocks = params.blockTitles.length
    ? params.blockTitles.map(t => `- ${t}`).join('\n')
    : '- (nenhum bloco ativo)'

  return `# ${params.moduleName} — ${params.restaurantName}

${baseNote}Este pacote contém arquivos de contexto para anexar no Lovable e um prompt para colar em modo **Planejar**.

## Documentos incluídos
${blocks}

Siga o assistente passo a passo na tela para montar seu módulo.`.trim()
}
