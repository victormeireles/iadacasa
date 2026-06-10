# IA da Casa — Regras de IA, geração de perguntas e Receita do Sistema

## 1. Objetivo deste documento

Este documento define como a IA da Casa deve usar inteligência artificial para:

* analisar markdowns internos;
* sugerir perguntas;
* gerar configuração de módulos;
* adaptar módulos ao contexto do cliente;
* gerar a Receita do Sistema;
* criar prompts para ferramentas externas;
* evitar duplicação;
* preservar módulos anteriores;
* guiar usuário leigo.

## 2. Princípio principal

A IA da Casa deve reduzir complexidade para o usuário.

O usuário não deve precisar entender:

* banco de dados;
* tabelas;
* arquitetura;
* autenticação;
* deploy;
* hospedagem;
* código;
* integrações técnicas;
* schema.

A plataforma deve traduzir a dor operacional em uma implementação guiada.

## 3. Dois momentos de uso de IA

A IA será usada em dois momentos diferentes.

### 3.1 IA no admin

Usada quando o time IA da Casa sobe ou edita um markdown.

Objetivo:

* analisar o documento;
* transformar conhecimento bruto em configuração operacional;
* sugerir perguntas;
* sugerir dependências;
* sugerir checklists;
* sugerir prompts;
* identificar riscos.

Essa etapa deve ser revisada por um admin antes de publicar.

### 3.2 IA na jornada do cliente

Usada quando o cliente escolhe um módulo.

Objetivo:

* considerar o perfil operacional do cliente;
* considerar módulos oficiais já instalados;
* considerar respostas do diagnóstico do módulo;
* considerar documentos internos aprovados;
* gerar a Receita do Sistema personalizada.

## 4. Fluxo da IA no admin

Quando um admin sobe um markdown de módulo:

1. Sistema salva o markdown como bloco de conhecimento.
2. Admin clica em “Gerar configuração inteligente”.
3. IA analisa o markdown.
4. IA gera:

   * resumo do módulo;
   * variáveis de customização;
   * perguntas sugeridas;
   * dependências;
   * cadastros necessários;
   * regras críticas;
   * checklist;
   * riscos;
   * prompts recomendados.
5. Admin revisa.
6. Admin aprova.
7. Módulo pode ser publicado.

## 5. Critérios para sugerir perguntas

A IA só deve sugerir perguntas que mudam a implementação.

Pergunta ruim:

> Você acha importante controlar ficha técnica?

Motivo: se o usuário escolheu o módulo, isso já está implícito.

Pergunta boa:

> Quem pode ver custo e margem dos produtos?

Motivo: altera permissões.

Pergunta boa:

> Você vende combos além de produtos individuais?

Motivo: altera estrutura de produto/ficha técnica.

Pergunta boa:

> O custo dos ingredientes pode variar por loja?

Motivo: altera estrutura multiunidade.

## 6. Limite de perguntas

O sistema deve evitar cansaço.

Regra recomendada:

* 5 a 8 perguntas obrigatórias por módulo;
* máximo de 12 perguntas obrigatórias;
* perguntas avançadas devem ser opcionais;
* perguntas já respondidas no diagnóstico base não devem ser repetidas;
* perguntas irrelevantes para o perfil do cliente devem ser omitidas.

## 7. Diagnóstico base

O diagnóstico base é feito apenas no início ou quando necessário.

Ele deve capturar informações gerais do restaurante.

Perguntas base recomendadas:

1. Qual é o nome do restaurante?
2. Qual é o segmento principal?
3. Quantas lojas/unidades você tem?
4. Quem vai usar o sistema?
5. Hoje você usa quais sistemas?
6. Qual é seu nível de familiaridade com tecnologia?
7. Quais são as maiores dores da operação?
8. Você quer começar com um sistema paralelo ao PDV atual?
9. Quem deve ter acesso de administrador?
10. Existem informações que operadores não devem ver?

O diagnóstico base deve gerar um resumo operacional do cliente.

## 8. Resumo operacional do cliente

Após o diagnóstico base, a IA deve gerar um resumo em linguagem natural e uma versão estruturada em JSON.

O resumo deve conter:

* nome do restaurante;
* segmento;
* tamanho da operação;
* número de lojas;
* principais usuários;
* sistemas atuais;
* dores prioritárias;
* nível técnico;
* orientação de permissões;
* estratégia inicial;
* observações relevantes.

Esse resumo deve ser usado em todos os módulos futuros.

## 9. Diagnóstico do módulo

Cada módulo terá perguntas próprias, geradas ou sugeridas pela IA no admin.

Exemplo para Ficha Técnica e Custo:

1. Você vende produtos individuais, combos ou ambos?
2. Você quer calcular apenas custo ou também margem/preço sugerido?
3. Quem pode ver custo e margem?
4. O custo dos ingredientes é único ou varia por loja?
5. Você quer guardar histórico de preço dos ingredientes?
6. Você usa adicionais que impactam o custo?
7. A ficha técnica deve conter modo de preparo ou apenas composição/custo?
8. Você quer exportar ficha técnica para planilha ou PDF?

## 10. Geração da Receita do Sistema

A Receita do Sistema é o pacote final entregue ao usuário.

Ela deve ser gerada combinando:

* resumo operacional do cliente;
* respostas do diagnóstico do módulo;
* módulos oficiais já instalados;
* documentos base;
* cadastros reutilizáveis necessários;
* documento do módulo;
* regras globais;
* prompts padrão;
* checklists.

## 11. Estrutura obrigatória da Receita do Sistema

Toda Receita do Sistema deve conter:

### 11.1 Título

Exemplo:

> Receita do Sistema — Base + Ficha Técnica

ou

> Receita do Sistema — Estoque de Insumos

### 11.2 Contexto do cliente

Resumo curto do restaurante e da necessidade.

### 11.3 O que será criado

Lista clara do que será implementado.

### 11.4 O que não será criado agora

Lista clara do que está fora do escopo.

Isso evita que a ferramenta externa invente escopo.

### 11.5 Regras de negócio

Regras operacionais em linguagem clara.

### 11.6 Cadastros necessários

Lista dos cadastros que precisam existir.

### 11.7 Telas necessárias

Lista das telas esperadas.

### 11.8 Estrutura técnica sugerida

Tabelas, campos e relacionamentos, mas com cuidado para não expor complexidade desnecessária ao usuário final.

### 11.9 Regras de permissão

Quem pode ver, editar, excluir, aprovar ou consultar.

### 11.10 Instruções anti-duplicação

Orientação obrigatória para a ferramenta externa verificar estruturas existentes.

### 11.11 Prompt final para ferramenta externa

Texto pronto para copiar e colar.

### 11.12 Checklist de validação

Lista de testes que o usuário deve executar.

### 11.13 Checklist de regressão

Quando não for o primeiro módulo, testar se módulos anteriores continuam funcionando.

## 12. Regra global anti-duplicação

Todo prompt final deve incluir esta regra:

Antes de criar qualquer nova tabela, tela, componente, cadastro ou fluxo, analise o projeto atual e verifique se já existe alguma estrutura equivalente ou parecida.

Se já existir, reutilize e adapte.

Não crie duplicidade de tabelas, telas ou cadastros.

Se houver dúvida entre reutilizar algo existente ou criar algo novo, pare e apresente as opções antes de executar.

Preserve os dados existentes.

Não apague, renomeie ou altere estruturas importantes sem necessidade clara.

## 13. Regra de planejamento obrigatório

Toda implementação deve começar com planejamento.

O prompt deve instruir a ferramenta externa a primeiro responder com:

1. o que entendeu;
2. o que encontrou no projeto atual;
3. o que pretende reutilizar;
4. o que pretende criar;
5. o que pretende alterar;
6. quais riscos existem;
7. quais confirmações precisa do usuário.

A ferramenta externa só deve implementar depois de confirmação explícita do usuário.

## 14. Regra de segurança

Todo pacote deve orientar:

* salvar versão antes de grandes alterações;
* testar com dados fictícios antes de usar na operação;
* não apagar dados existentes;
* não alterar permissões críticas sem validação;
* testar login;
* testar permissões;
* testar no celular;
* validar cálculos manualmente;
* manter backup/exportação quando possível.

## 15. Regra de escopo

A IA da Casa deve evitar escopo excessivo.

Se o usuário escolheu Ficha Técnica, não criar:

* estoque completo;
* compras;
* financeiro;
* produção;
* integração com PDV;
* RH;
* relatórios avançados não solicitados.

Pode preparar cadastros necessários, mas sem expandir para módulos inteiros.

## 16. Módulos oficiais instalados

A IA da Casa deve guardar quais módulos foram oficialmente gerados/instalados pela plataforma.

Exemplo:

* Base v1;
* Ficha Técnica v1;
* Receitas v1;
* Estoque v1.

Esse histórico deve ser incluído no pacote de novos módulos.

Exemplo de instrução:

> Este cliente já instalou oficialmente Base v1 e Ficha Técnica v1 pela IA da Casa. Ao implementar Estoque, preserve e reaproveite estruturas relacionadas a usuários, permissões, ingredientes, produtos e unidades de medida.

## 17. Não perguntar ao usuário sobre estrutura técnica existente

A IA da Casa não deve perguntar:

* Você já tem tabela de ingredientes?
* Você já tem tabela de usuários?
* Você já tem tabela de produtos?
* Você já tem relacionamento X?

O usuário leigo não sabe responder.

Em vez disso, o prompt final deve mandar a ferramenta externa analisar o projeto atual.

## 18. Prompt interno para gerar configuração inteligente do módulo

Use este template como referência:

Você é a IA da Casa, uma plataforma que transforma processos reais de restaurantes em sistemas personalizados construídos com IA.

Sua tarefa é analisar o markdown de um módulo e gerar uma configuração inteligente para uso interno da plataforma.

Leia o documento abaixo e gere:

1. resumo do módulo;
2. dor operacional que ele resolve;
3. resultado esperado;
4. variáveis que mudam a implementação;
5. perguntas recomendadas para o usuário;
6. tipo de cada pergunta;
7. quais perguntas são obrigatórias;
8. quais perguntas são opcionais;
9. dependências;
10. cadastros reutilizáveis necessários;
11. regras críticas de negócio;
12. riscos de implementação;
13. checklist de validação;
14. instruções específicas para ferramenta externa;
15. escopo que deve ficar fora deste módulo.

Regras:

* sugira poucas perguntas;
* priorize perguntas que mudam a implementação;
* evite perguntas óbvias;
* use linguagem simples;
* pense em donos de restaurantes leigos em tecnologia;
* não publique nada automaticamente;
* gere saída estruturada.

## 19. Prompt interno para gerar Receita do Sistema

Use este template como referência:

Você é a IA da Casa.

Sua tarefa é adaptar um módulo de sistema ao contexto específico de um restaurante.

Considere:

1. Perfil operacional do cliente;
2. Módulos oficiais já instalados;
3. Respostas do diagnóstico deste módulo;
4. Documento-base do módulo;
5. Cadastros reutilizáveis necessários;
6. Regras globais de segurança;
7. Regra anti-duplicação;
8. Regra de planejamento obrigatório.

Gere uma Receita do Sistema contendo:

* título;
* contexto do cliente;
* objetivo do módulo;
* o que será criado;
* o que não será criado agora;
* regras de negócio;
* cadastros necessários;
* telas necessárias;
* estrutura técnica sugerida;
* permissões;
* instruções de reaproveitamento;
* prompt final para ferramenta externa;
* checklist de validação;
* checklist de regressão quando aplicável.

Regras:

* não crie escopo além do necessário;
* não duplique cadastros;
* preserve módulos anteriores;
* use linguagem clara;
* o usuário final é dono de restaurante, não programador;
* a ferramenta externa deve planejar antes de executar;
* a ferramenta externa deve analisar o projeto atual antes de criar estruturas novas.

## 20. Prompt final para ferramenta externa

Todo pacote deve gerar um prompt final para a ferramenta externa.

Estrutura recomendada:

1. contexto do projeto;
2. módulo a ser implementado;
3. histórico oficial de módulos IA da Casa;
4. escopo incluído;
5. escopo excluído;
6. regras de negócio;
7. telas e cadastros esperados;
8. permissões;
9. regra anti-duplicação;
10. regra de planejamento obrigatório;
11. pedido para não executar ainda;
12. pedido para apresentar plano primeiro.

Exemplo de abertura:

Você está trabalhando no sistema de gestão personalizado de um restaurante.
Este sistema está sendo construído com base na metodologia IA da Casa.
Sua tarefa é implementar o módulo abaixo respeitando o escopo, as regras de negócio, os módulos já existentes e as instruções de segurança.

Antes de executar qualquer alteração, analise o projeto atual e apresente um plano.

Não implemente nada até eu confirmar.

## 21. Checklist padrão de validação

Todo módulo deve ter checklist.

Checklist base:

* login funciona;
* usuário admin acessa;
* usuário operador acessa;
* permissões estão corretas;
* cadastros principais funcionam;
* edição funciona;
* exclusão perigosa está protegida;
* tela funciona no celular;
* dados salvos permanecem após atualizar página;
* cálculos importantes batem manualmente;
* não criou cadastros duplicados;
* não quebrou módulos anteriores.

## 22. Checklist específico de Ficha Técnica

Para o MVP, o módulo Ficha Técnica e Custo deve validar:

* cadastrar ingrediente;
* definir unidade de compra;
* definir custo do ingrediente;
* cadastrar produto do cardápio;
* montar ficha técnica com ingredientes;
* informar quantidade de cada ingrediente;
* calcular custo total do produto;
* calcular custo por unidade;
* calcular margem, se habilitado;
* esconder custo/margem de operador, se configurado;
* editar custo de ingrediente;
* verificar se custo do produto atualiza corretamente;
* testar produto com adicionais, se aplicável;
* testar combo, se aplicável;
* validar cálculo manualmente em pelo menos um produto real;
* testar no celular;
* garantir que não criou estoque completo sem necessidade.

## 23. Primeira implementação recomendada

O primeiro módulo ativo deve ser:

> Ficha Técnica e Custo

O MVP deve permitir:

* usuário escolher esse módulo;
* responder diagnóstico base;
* responder diagnóstico do módulo;
* gerar resumo operacional;
* gerar Receita do Sistema;
* copiar prompt;
* acompanhar checklist.

Outros módulos podem aparecer como “em breve”.

## 24. Saída esperada do sistema

Quando o usuário concluir o diagnóstico, a tela deve mostrar:

* mensagem de sucesso;
* nome do pacote gerado;
* resumo do que será criado;
* botão para copiar prompt;
* botão para baixar/ver markdown;
* checklist;
* instruções de próximo passo;
* alerta de que a ferramenta externa é paga por fora;
* link para comunidade/suporte.

## 25. Tom da IA da Casa

A IA deve falar como um especialista prático de operação de restaurantes.

Tom:

* direto;
* simples;
* seguro;
* sem jargão;
* sem exagero;
* sem prometer mágica;
* orientado a ação.

Evitar:

* “revolucionário”;
* “transformação digital”;
* “solução disruptiva”;
* “poder da IA” em excesso;
* linguagem de programador.
