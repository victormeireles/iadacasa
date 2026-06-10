# IA da Casa — Arquitetura funcional, entidades e painel admin

## 1. Objetivo deste documento

Este documento descreve a arquitetura funcional da plataforma IA da Casa.

Ele deve orientar a implementação inicial do sistema, incluindo:

* áreas da aplicação;
* tipos de usuários;
* entidades principais;
* banco de dados;
* painel admin;
* biblioteca de conhecimento;
* módulos;
* perguntas geradas por IA;
* geração de pacotes;
* histórico do cliente.

## 2. Tipos de usuário

A plataforma deve considerar pelo menos estes tipos de usuário:

### 2.1 Usuário cliente

É o dono, gestor ou operador do restaurante que usa a IA da Casa para criar módulos do próprio sistema.

Permissões:

* acessar área do cliente;
* responder diagnósticos;
* escolher módulos;
* visualizar módulos disponíveis;
* gerar Receita do Sistema;
* copiar prompts;
* visualizar checklists;
* marcar progresso do módulo;
* acessar comunidade;
* enviar formulário de trava.

### 2.2 Admin IA da Casa

É o usuário interno da IA da Casa.

Permissões:

* criar módulos;
* editar módulos;
* arquivar módulos;
* subir documentos base;
* editar blocos de conhecimento;
* gerar configuração inteligente de módulo com IA;
* revisar perguntas sugeridas;
* revisar dependências sugeridas;
* revisar checklists sugeridos;
* aprovar publicação de módulos;
* visualizar usuários;
* visualizar pacotes gerados;
* visualizar respostas de diagnóstico;
* visualizar status dos clientes;
* gerenciar conteúdos e templates.

### 2.3 Super admin

Pode fazer tudo que o admin faz, além de:

* gerenciar admins;
* alterar configurações globais;
* gerenciar planos;
* gerenciar integrações;
* acessar logs críticos.

No MVP, admin e super admin podem ser tratados como um único papel se necessário.

## 3. Áreas principais da aplicação

A plataforma deve ter pelo menos:

### 3.1 Landing page

Objetivo:

* explicar a proposta;
* apresentar a tese;
* mostrar dores;
* mostrar cardápio de soluções;
* captar leads;
* direcionar para login/cadastro.

### 3.2 Área do cliente

Contém:

* dashboard;
* perfil do restaurante;
* cardápio de soluções;
* módulos disponíveis;
* módulos instalados;
* diagnósticos;
* Receitas do Sistema geradas;
* checklists;
* acesso à comunidade;
* formulário de travas.

### 3.3 Área admin

Contém:

* gerenciamento de módulos;
* gerenciamento de documentos;
* gerenciamento de cadastros reutilizáveis;
* gerenciamento de prompts padrão;
* gerenciamento de checklists;
* geração de configuração inteligente por IA;
* preview de Receita do Sistema;
* usuários/clientes;
* histórico de pacotes gerados.

## 4. Dashboard do cliente

O dashboard do cliente deve mostrar:

* nome do restaurante;
* resumo operacional;
* módulos instalados;
* módulos em andamento;
* próximos módulos recomendados;
* cardápio de soluções;
* botão para continuar último módulo;
* link para comunidade;
* link para ajuda/travas.

Estados possíveis:

### Cliente novo

Mostrar:

* boas-vindas;
* explicação simples;
* cardápio de soluções;
* chamada para escolher primeira dor.

### Cliente com módulo em andamento

Mostrar:

* módulo atual;
* status;
* próximo passo;
* checklist pendente.

### Cliente com módulos instalados

Mostrar:

* módulos instalados;
* sugestões de evolução;
* histórico;
* próximos módulos recomendados.

## 5. Cardápio de soluções

Cada solução/módulo deve ter:

* nome;
* descrição curta;
* dor que resolve;
* resultado esperado;
* nível de dificuldade;
* tempo estimado;
* status;
* segmento recomendado;
* dependências;
* chamada para ação.

Exemplo:

Nome: Ficha Técnica e Custo
Dor: não saber custo real e margem dos produtos.
Resultado: módulo para cadastrar ingredientes, montar ficha técnica e calcular custo.
Nível: básico
Tempo estimado: 1 a 3 horas
Status: disponível

## 6. Biblioteca de conhecimento

A biblioteca de conhecimento é o ativo principal da IA da Casa.

Ela deve ser composta por blocos versionados, editáveis no admin.

Tipos de blocos:

* base;
* módulo;
* cadastro reutilizável;
* prompt padrão;
* regra global;
* checklist;
* exemplo;
* guia de uso;
* template de resposta;
* instrução técnica.

Importante:

* blocos não devem ser tratados como arquivos soltos;
* blocos devem ter status;
* blocos devem ter versão;
* blocos devem poder ser arquivados;
* blocos antigos devem permanecer disponíveis para auditoria;
* pacotes gerados devem registrar quais versões de blocos foram usadas.

## 7. Estrutura sugerida de banco

A estrutura abaixo é conceitual. A implementação pode adaptar nomes conforme padrão técnico do projeto.

### 7.1 users

Representa usuários da plataforma.

Campos sugeridos:

* id;
* name;
* email;
* role;
* created_at;
* updated_at.

Roles possíveis:

* client;
* admin;
* super_admin.

### 7.2 restaurants

Representa o negócio do cliente.

Campos sugeridos:

* id;
* owner_user_id;
* name;
* segment;
* city;
* state;
* number_of_units;
* operation_type;
* technical_level;
* current_systems;
* created_at;
* updated_at.

Segmentos possíveis:

* hamburgueria;
* restaurante;
* pizzaria;
* bar;
* cafeteria;
* dark_kitchen;
* delivery;
* outro.

### 7.3 client_operational_profiles

Resumo operacional gerado pela IA após diagnóstico base.

Campos sugeridos:

* id;
* restaurant_id;
* summary;
* structured_data;
* generated_at;
* source_answers;
* version.

`summary` pode ser texto em linguagem natural.
`structured_data` pode guardar JSON com informações importantes.

### 7.4 modules

Representa os módulos disponíveis no cardápio.

Campos sugeridos:

* id;
* name;
* slug;
* short_description;
* pain;
* expected_result;
* segment;
* difficulty_level;
* estimated_time;
* status;
* order_index;
* created_at;
* updated_at.

Status possíveis:

* draft;
* active;
* coming_soon;
* archived.

### 7.5 knowledge_blocks

Representa documentos internos e blocos reutilizáveis.

Campos sugeridos:

* id;
* title;
* slug;
* type;
* content_markdown;
* version;
* status;
* created_by;
* created_at;
* updated_at.

Tipos possíveis:

* base;
* module;
* reusable_registration;
* standard_prompt;
* global_rule;
* checklist;
* example;
* implementation_guide.

Status possíveis:

* draft;
* active;
* archived.

### 7.6 module_knowledge_blocks

Relaciona módulos com blocos de conhecimento.

Campos sugeridos:

* id;
* module_id;
* knowledge_block_id;
* usage_type;
* required;
* condition;
* order_index.

Usage types possíveis:

* required_context;
* optional_context;
* dependency;
* checklist;
* prompt;
* rule.

### 7.7 module_ai_configs

Configuração gerada por IA ao subir ou editar um markdown de módulo.

Campos sugeridos:

* id;
* module_id;
* source_knowledge_block_id;
* module_summary;
* customization_variables;
* suggested_questions;
* suggested_dependencies;
* suggested_checklist;
* suggested_prompts;
* risks;
* status;
* approved_by;
* approved_at;
* created_at;
* updated_at.

Status possíveis:

* generated;
* reviewed;
* approved;
* rejected;
* archived.

### 7.8 diagnostic_questions

Perguntas sugeridas e aprovadas para cada módulo.

Mesmo que a IA gere as perguntas automaticamente, elas devem ser persistidas para revisão, consistência e auditoria.

Campos sugeridos:

* id;
* module_id;
* question_text;
* question_type;
* options;
* required;
* max_length;
* order_index;
* condition;
* variable_key;
* status;
* created_at;
* updated_at.

Question types possíveis:

* text;
* textarea;
* number;
* single_choice;
* multiple_choice;
* boolean.

No MVP, o sistema pode simplificar e usar apenas texto, textarea, número, escolha única e sim/não.

### 7.9 client_module_answers

Respostas dadas pelo cliente em cada módulo.

Campos sugeridos:

* id;
* restaurant_id;
* module_id;
* user_id;
* answers_json;
* created_at;
* updated_at.

### 7.10 user_module_installations

Histórico dos módulos oficiais instalados via IA da Casa.

Campos sugeridos:

* id;
* restaurant_id;
* module_id;
* module_version;
* status;
* started_at;
* generated_at;
* installed_at;
* validated_at;
* generated_package_id.

Status possíveis:

* not_started;
* diagnostic_started;
* diagnostic_completed;
* package_generated;
* implementation_started;
* installed;
* validated;
* needs_adjustment;
* archived.

### 7.11 generated_packages

Receitas do Sistema geradas para o cliente.

Campos sugeridos:

* id;
* restaurant_id;
* module_id;
* user_id;
* package_title;
* package_markdown;
* prompt_for_external_tool;
* checklist_json;
* source_blocks_json;
* client_context_snapshot;
* module_answers_snapshot;
* generated_at;
* status.

O campo `source_blocks_json` deve registrar ids e versões dos blocos usados.

### 7.12 support_requests

Formulário de travas.

Campos sugeridos:

* id;
* restaurant_id;
* user_id;
* module_id;
* tool_used;
* issue_description;
* intended_action;
* actual_result;
* prompt_used;
* screenshot_url;
* status;
* created_at;
* updated_at.

Status possíveis:

* open;
* reviewing;
* answered;
* solved;
* closed.

## 8. Painel admin

O painel admin deve ser simples, funcional e orientado à operação.

Menu sugerido:

1. Módulos
2. Blocos de conhecimento
3. Cadastros reutilizáveis
4. Prompts padrão
5. Regras globais
6. Perguntas de diagnóstico
7. Checklists
8. Pacotes gerados
9. Usuários e restaurantes
10. Travas/suporte

## 9. Admin — Módulos

Tela de módulos deve permitir:

* listar módulos;
* criar novo módulo;
* editar módulo;
* alterar status;
* definir ordem;
* definir segmento;
* definir dificuldade;
* associar blocos;
* gerar configuração por IA;
* visualizar preview;
* publicar.

Campos do módulo:

* nome;
* slug;
* descrição curta;
* dor que resolve;
* resultado esperado;
* segmento;
* dificuldade;
* tempo estimado;
* status;
* card image/icon opcional.

## 10. Admin — Blocos de conhecimento

Tela de blocos deve permitir:

* criar bloco;
* editar markdown;
* salvar versão;
* arquivar;
* duplicar;
* filtrar por tipo;
* buscar;
* associar a módulos.

Campos obrigatórios:

* título;
* tipo;
* conteúdo markdown;
* status.

Campos recomendados:

* slug;
* versão;
* descrição;
* tags;
* segmento.

## 11. Admin — Configuração inteligente por IA

Quando um admin sobe ou altera um markdown de módulo, deve poder clicar em:

> Gerar configuração inteligente

A IA deve analisar o markdown e sugerir:

* resumo do módulo;
* variáveis que mudam a implementação;
* perguntas recomendadas;
* dependências;
* cadastros reutilizáveis necessários;
* regras de negócio importantes;
* riscos;
* checklist;
* prompts base.

O admin deve poder revisar e aprovar.

Não publicar configuração gerada por IA automaticamente sem revisão.

## 12. Admin — Preview da Receita do Sistema

Antes de ativar um módulo, o admin deve conseguir simular um cliente e gerar uma Receita do Sistema de preview.

O preview deve mostrar:

* contexto usado;
* perguntas feitas;
* respostas simuladas;
* blocos usados;
* versões dos blocos;
* pacote final;
* prompt final para ferramenta externa;
* checklist.

Isso é essencial para testar qualidade.

## 13. Geração automática de perguntas

O sistema deve evitar que o admin precise cadastrar pergunta por pergunta manualmente.

Fluxo recomendado:

1. Admin sobe markdown do módulo.
2. IA lê o documento.
3. IA identifica quais variáveis mudam a implementação.
4. IA sugere poucas perguntas relevantes.
5. IA classifica perguntas por impacto.
6. IA define se pergunta é obrigatória ou opcional.
7. Admin revisa e aprova.

Regra:

* cada módulo deve ter poucas perguntas obrigatórias;
* ideal: 5 a 8 obrigatórias;
* máximo recomendado: 12;
* perguntas opcionais avançadas podem existir, mas não devem atrapalhar o fluxo.

Perguntas devem ser feitas apenas se alteram a implementação.

## 14. Tipos de pergunta

Mesmo que o admin não cadastre manualmente, a IA deve classificar perguntas em tipos para a interface renderizar corretamente.

Tipos mínimos:

* texto curto;
* texto longo;
* número;
* sim/não;
* escolha única;
* múltipla escolha.

Exemplo:

Pergunta: Você tem mais de uma loja?
Tipo: sim/não
Variável: multi_unidade
Impacto: muda permissões e estrutura de unidades.

Pergunta: Quem pode ver custo e margem?
Tipo: múltipla escolha
Variável: permissao_visualizacao_custos
Impacto: muda regras de acesso.

## 15. Cadastros reutilizáveis

Cadastros reutilizáveis devem ser tratados como blocos internos.

Exemplos:

* produtos;
* ingredientes;
* fornecedores;
* funcionários;
* unidades de medida;
* categorias;
* lojas/unidades;
* contas financeiras;
* formas de pagamento.

O usuário não deve receber todos os cadastros de uma vez.

O sistema deve incluir apenas os cadastros necessários para o módulo escolhido.

Exemplo:

Ficha Técnica usa:

* produtos;
* ingredientes;
* unidades de medida.

Estoque usa:

* ingredientes;
* fornecedores;
* entradas;
* saídas;
* unidades de medida.

Financeiro usa:

* categorias financeiras;
* contas;
* formas de pagamento;
* despesas;
* receitas.

## 16. Histórico oficial do cliente

A IA da Casa deve guardar apenas o que ela oficialmente gerou/instalou.

Não perguntar para o usuário sobre tabelas técnicas que ele criou por fora.

Para alterações externas, o pacote final deve instruir a ferramenta externa a verificar o projeto atual e reaproveitar estruturas existentes.

## 17. Integração com ferramenta externa

No MVP, a IA da Casa não precisa integrar diretamente com Lovable/Replit.

Ela pode gerar:

* instruções;
* arquivos markdown;
* prompts;
* checklists.

O usuário copia e cola na ferramenta externa.

No futuro, pode haver integração direta se fizer sentido.

## 18. Design e UX

O design deve seguir o design system criado no Claude Design.

A interface deve parecer:

* moderna;
* limpa;
* confiável;
* gastronômica sem clichê;
* simples para usuário leigo;
* guiada;
* brasileira;
* prática;
* profissional.

Evitar:

* visual técnico demais;
* aparência de ferramenta para programadores;
* excesso de termos de IA;
* neon/futurismo exagerado;
* muita complexidade aparente.

## 19. MVP técnico

Para o MVP, implementar:

* autenticação;
* roles simples;
* dashboard cliente;
* cardápio de soluções;
* módulo Ficha Técnica disponível;
* outros módulos em breve;
* diagnóstico base;
* diagnóstico do módulo;
* geração de Receita do Sistema;
* painel admin simples;
* CRUD de módulos;
* CRUD de blocos de conhecimento;
* geração de configuração por IA pode ser mockada inicialmente, se necessário;
* preview de pacote;
* histórico de pacotes gerados.

Se a IA real ainda não estiver conectada, criar arquitetura preparada e usar geração simulada/mock para validar fluxo.
