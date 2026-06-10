# IA da Casa — Produto, posicionamento e fluxos principais

## 1. Visão geral do produto

A IA da Casa é uma plataforma para donos de restaurantes criarem seus próprios sistemas de gestão personalizados com IA.

O produto não é um SaaS tradicional. A proposta é ajudar o usuário a transformar os processos reais do restaurante em módulos de sistema construídos com ferramentas de vibe coding, começando pelas dores mais importantes da operação.

A IA da Casa entrega:

* cardápio de soluções;
* diagnóstico guiado;
* documentos de implementação;
* prompts prontos;
* passo a passo para ferramenta externa;
* comunidade;
* biblioteca de módulos;
* regras de segurança;
* checklists de validação.

A construção do sistema acontece fora da IA da Casa, inicialmente em uma ferramenta como Lovable. O usuário terá conta própria nessa ferramenta e pagará essa ferramenta por fora.

A IA da Casa não hospeda o sistema final do cliente e não deve assumir responsabilidade por infraestrutura, banco, domínio, autenticação ou custos externos. A plataforma guia, organiza, ensina e gera os pacotes de implementação.

## 2. Posicionamento

Frase principal:

> Crie um sistema de gestão sob medida para o seu restaurante, começando pelas dores que mais atrapalham sua operação.

Variações de apoio:

> Seu restaurante não precisa se adaptar a um sistema genérico. Com IA, você cria uma gestão adaptada ao seu jeito de operar.

> A IA da Casa transforma processos reais de restaurantes em módulos de sistema personalizados, com passo a passo, prompts e orientação prática.

## 3. Público-alvo inicial

O público-alvo amplo é food service:

* restaurantes;
* hamburguerias;
* bares;
* pizzarias;
* cafeterias;
* dark kitchens;
* operações de delivery;
* redes pequenas;
* negócios independentes com operação complexa.

O MVP deve começar com hamburguerias e restaurantes pequenos/médios, aproveitando a autoridade e distribuição do Saulo/Stela Burger/Burger Tour.

## 4. Problema que a IA da Casa resolve

Donos de restaurantes costumam sofrer com:

* sistemas genéricos que não se adaptam à rotina real;
* controles paralelos em planilhas;
* falta de ficha técnica confiável;
* estoque desorganizado;
* receitas sem padronização;
* compras feitas no feeling;
* falhas de processo;
* dificuldade de transformar conhecimento operacional em sistema;
* baixa clareza sobre custo, margem e perdas;
* dependência de SaaS que resolve parte do problema, mas não o processo específico.

A tese da IA da Casa:

> O dono conhece a dor do restaurante, mas não sabe transformar essa dor em sistema. A IA da Casa faz essa ponte.

## 5. O que o produto não é

A IA da Casa não é:

* um PDV;
* um ERP completo pronto;
* uma software house;
* um SaaS tradicional;
* uma consultoria ilimitada;
* um suporte técnico individual para qualquer bug;
* uma plataforma que hospeda todos os sistemas dos clientes.

A IA da Casa é uma plataforma guiada para construir sistemas personalizados com IA.

## 6. Conceito central: cardápio de soluções

A experiência principal deve ser organizada como um “cardápio de soluções”.

O usuário entra e vê cards de módulos, por exemplo:

* Ficha Técnica e Custo;
* Receitas Operacionais;
* Estoque de Insumos;
* Entrada e Saída;
* Compras;
* Checklist de Abertura e Fechamento;
* Produção;
* Controle de Perdas;
* Dashboard do Dono;
* Financeiro Simples;
* RH e Escalas.

Cada card deve ser apresentado como uma solução prática para uma dor do restaurante, não como uma funcionalidade técnica.

Exemplo de card:

Título: Ficha Técnica e Custo
Descrição: Cadastre ingredientes, monte fichas técnicas e descubra o custo real dos produtos do cardápio.
Resultado: módulo para calcular custo, margem e padronizar composição dos produtos.
Status: disponível / em breve / avançado.

## 7. Lógica de primeiro módulo

O usuário não começa obrigatoriamente pelo “módulo base”.

Ele começa pela dor.

Exemplo:

* usuário seleciona Ficha Técnica como primeiro módulo;
* a IA da Casa detecta que ele ainda não tem módulos instalados oficialmente;
* o sistema embute no pacote tudo que for necessário da base;
* o usuário sente que está criando Ficha Técnica, mas por trás o pacote inclui estrutura mínima do sistema.

A base deve ser invisível ou semi-invisível para o usuário. A interface pode explicar:

> Como esse é seu primeiro módulo, vamos preparar também a estrutura mínima do seu sistema: restaurante, usuários, permissões e cadastros necessários.

## 8. Fluxo do primeiro módulo

Quando o usuário escolhe o primeiro módulo, o fluxo deve ser:

1. Usuário acessa a plataforma.
2. Usuário escolhe uma solução no cardápio.
3. Sistema identifica que é o primeiro módulo oficial instalado.
4. Sistema faz perguntas base sobre o negócio.
5. Sistema gera um resumo operacional do cliente.
6. Sistema faz perguntas específicas do módulo escolhido.
7. Sistema consulta os documentos internos da base.
8. Sistema consulta os documentos internos do módulo.
9. Sistema consulta cadastros reutilizáveis necessários.
10. Sistema monta uma “Receita do Sistema”.
11. Usuário vê passo a passo para implementar na ferramenta externa.
12. Usuário cola o prompt na ferramenta externa.
13. A ferramenta externa deve primeiro planejar e só depois implementar.
14. Usuário valida com checklist.
15. Sistema marca o módulo como gerado/instalado/validado conforme progresso.

## 9. Fluxo de segundo módulo em diante

Quando o usuário já tem módulos instalados oficialmente pela IA da Casa:

1. Usuário escolhe novo módulo no cardápio.
2. Sistema consulta o histórico oficial do cliente.
3. Sistema sabe quais módulos oficiais já foram instalados.
4. Sistema faz apenas perguntas específicas necessárias para o novo módulo.
5. Sistema gera pacote incremental.
6. O pacote informa à ferramenta externa quais módulos oficiais já existem.
7. O pacote obriga a ferramenta externa a analisar o projeto atual antes de criar novas tabelas, telas ou cadastros.
8. O pacote orienta a reutilizar estruturas existentes sempre que fizer sentido.
9. A ferramenta externa deve apresentar plano antes de executar.
10. Usuário confirma.
11. Ferramenta externa implementa.
12. Usuário valida o módulo novo.
13. Usuário valida se módulos antigos não quebraram.

Importante: a IA da Casa não deve perguntar ao usuário leigo se ele tem tabela X, Y ou Z. Esse tipo de checagem técnica deve ser feito pela ferramenta externa dentro do projeto do usuário.

## 10. Resumo operacional do cliente

No primeiro módulo, após o diagnóstico base, o sistema deve gerar e salvar um resumo operacional do cliente.

Exemplo de resumo:

Restaurante: Stela Burger
Segmento: Hamburgueria
Operação: 2 lojas
Usuários principais: dono, gerente, cozinha e estoque
Nível técnico: baixo
Sistemas atuais: PDV externo e planilhas
Prioridade: controlar custo, padronizar ficha técnica e reduzir erro operacional
Permissões: operador não deve ver margem
Estratégia: sistema paralelo ao PDV, começando por ficha técnica

Esse resumo deve ser reutilizado em módulos futuros.

## 11. Linguagem da interface

A linguagem deve ser simples, objetiva e voltada para dono de restaurante.

Evitar termos como:

* schema;
* migration;
* endpoint;
* RLS;
* payload;
* backend;
* front-end;
* deploy;
* stack.

Quando termos técnicos forem necessários, explicar em linguagem comum.

Preferir:

* “cadastro” em vez de “tabela”;
* “tela” em vez de “interface”;
* “permissão” em vez de “controle de acesso granular”;
* “passo a passo” em vez de “workflow”;
* “Receita do Sistema” em vez de “documento markdown”.

## 12. Nome do pacote final

O pacote gerado para o usuário deve ser chamado preferencialmente de:

> Receita do Sistema

Nomes alternativos aceitáveis:

* Pacote de Implementação;
* Plano de Construção;
* Guia de Implementação.

A “Receita do Sistema” deve conter:

* resumo da implementação;
* contexto do restaurante;
* escopo incluído;
* escopo excluído;
* regras de negócio;
* cadastros necessários;
* telas necessárias;
* estrutura técnica sugerida;
* prompt para ferramenta externa;
* checklist de validação;
* cuidados antes de executar.

## 13. MVP recomendado

O MVP não deve tentar construir toda a plataforma completa.

O MVP deve provar uma jornada:

> Um dono de hamburgueria consegue criar um módulo útil de ficha técnica e custo usando a IA da Casa e uma ferramenta externa de vibe coding, sem depender de programador.

Escopo do MVP:

* landing page simples;
* login;
* cardápio de soluções;
* módulo Ficha Técnica e Custo disponível;
* outros módulos marcados como “em breve”;
* diagnóstico base;
* diagnóstico de ficha técnica;
* geração da Receita do Sistema;
* área para copiar prompt;
* checklist de validação;
* painel admin para gerenciar documentos/módulos;
* comunidade via WhatsApp;
* formulário de travas.

## 14. Primeiro módulo do MVP

O primeiro módulo recomendado é:

> Ficha Técnica e Custo

Motivos:

* dor clara;
* mexe com dinheiro;
* fácil de vender;
* serve para vários tipos de restaurante;
* conecta com margem, CMV e preço;
* gera valor rápido;
* permite evoluir depois para estoque, compras e produção.

## 15. Estados de progresso do usuário

Cada módulo do usuário deve ter status:

* não iniciado;
* diagnóstico iniciado;
* diagnóstico concluído;
* Receita do Sistema gerada;
* implementação iniciada;
* instalado;
* validado;
* precisa de ajuste;
* arquivado.

No MVP, os status podem ser simples, mas o modelo deve permitir evolução.

## 16. Comunidade

Para o MVP, a comunidade pode ser no WhatsApp.

Estrutura recomendada:

* grupo de avisos;
* grupo de dúvidas e travas;
* grupo de cases/evolução.

O WhatsApp deve ser usado para interação. O conteúdo principal deve ficar na plataforma.

Toda trava deve idealmente ser enviada por formulário estruturado com:

* nome;
* restaurante;
* módulo;
* ferramenta usada;
* prompt colado;
* print do erro;
* o que queria fazer;
* o que aconteceu.

## 17. Suporte

O suporte incluso deve cobrir:

* dúvidas sobre os módulos oficiais;
* dúvidas sobre diagnóstico;
* dúvidas sobre prompts;
* dúvidas sobre processo;
* participação em plantões coletivos.

O suporte incluso não deve cobrir:

* desenvolvimento feito pela equipe IA da Casa;
* correção individual ilimitada de bugs;
* acesso direto à conta do cliente;
* integrações específicas;
* recuperação de sistema quebrado por alteração fora do método;
* suporte técnico da ferramenta externa.

Serviços premium podem incluir:

* implantação assistida;
* revisão individual;
* call de diagnóstico;
* construção junto com o cliente;
* consultoria de processo.

## 18. Transparência sobre ferramenta externa

A plataforma deve deixar claro:

* a IA da Casa guia a construção;
* a ferramenta externa é paga por fora;
* o cliente usa conta própria;
* eventuais custos de domínio, banco, hospedagem ou assinatura não estão inclusos;
* a recomendação inicial é usar Lovable, mas a arquitetura deve permitir outras ferramentas no futuro.

## 19. Princípios de produto

A IA da Casa deve seguir estes princípios:

1. O usuário começa pela dor, não pela arquitetura.
2. A base é embutida quando necessária.
3. A plataforma evita perguntas técnicas para usuário leigo.
4. A IA gera perguntas, mas com controle e aprovação no admin.
5. O pacote final deve ser simples de usar.
6. Toda implementação deve ter planejamento antes de execução.
7. Toda alteração deve preservar módulos anteriores.
8. Todo módulo deve ter checklist.
9. O sistema deve guardar histórico oficial do que foi instalado.
10. A biblioteca de conhecimento é o ativo principal da plataforma.
