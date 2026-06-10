/* IA da Casa — Cardápio de soluções (home) */
const DS = window.IADaCasaDesignSystem_449ba5;

function CardapioScreen({ data, onPick }) {
  const { ModuleCard, Badge } = DS;
  const { modules, restaurant } = data;
  return (
    <Page width="lg">
      <section className="cardapio-hero">
        <div className="cardapio-hero__text">
          <p className="ia-eyebrow">Cardápio de soluções</p>
          <h1 className="cardapio-hero__title">
            Qual dor da sua cozinha<br />vamos resolver primeiro?
          </h1>
          <p className="cardapio-hero__sub">
            Escolha um módulo, responda algumas perguntas sobre o seu negócio e
            receba a <strong>Receita do Sistema</strong> — pronta pra montar.
          </p>
        </div>
        <div className="cardapio-hero__card">
          <Badge variant="brand" dot>2 módulos prontos</Badge>
          <p className="cardapio-hero__card-q">“{modules[0].dor}”</p>
          <p className="cardapio-hero__card-a">Comece pela <strong>Ficha Técnica</strong>. É a base de tudo.</p>
        </div>
      </section>

      <div className="cardapio-grid">
        {modules.map((m) => (
          <ModuleCard
            key={m.key}
            accent={m.accent}
            icon={m.icon}
            title={m.title}
            description={m.desc}
            status={m.status}
            meta={m.status === 'soon' ? null : <><i data-lucide="clock"></i> {m.time}</>}
            onClick={() => m.status !== 'soon' && onPick(m)}
          />
        ))}
      </div>
    </Page>
  );
}

Object.assign(window, { CardapioScreen });
