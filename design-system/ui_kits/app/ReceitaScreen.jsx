/* IA da Casa — Receita do Sistema (output gerado) */
const DS = window.IADaCasaDesignSystem_449ba5;

function ReceitaScreen({ data, module, onBack }) {
  const { Button, Badge, Card, Callout, StepList } = DS;
  const m = module || data.modules[0];
  const r = data.recipe;
  const [copied, setCopied] = React.useState(false);

  const copyPrompt = () => {
    try { navigator.clipboard && navigator.clipboard.writeText(r.prompt); } catch (e) {}
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <Page width="lg">
      <button className="ia-back" onClick={onBack}>
        <i data-lucide="arrow-left"></i> Voltar ao questionário
      </button>

      <header className="receita-head">
        <div className="receita-head__left">
          <Badge variant="success" dot>Receita pronta</Badge>
          <h1 className="receita-head__title">Receita do Sistema · {r.module}</h1>
          <p className="receita-head__sub">
            Feita para uma <strong>{data.questions[0].value.toLowerCase()}</strong> com cerca de
            {' '}{data.questions[1].value} itens no cardápio.
          </p>
        </div>
        <div className="receita-head__actions">
          <Button variant="secondary" leftIcon={<i data-lucide="download"></i>}>Baixar PDF</Button>
          <Button variant="primary" rightIcon={<i data-lucide="arrow-up-right"></i>}>Montar no Lovable</Button>
        </div>
      </header>

      <div className="receita-grid">
        <div className="receita-main">
          <Card padding="lg">
            <p className="ia-eyebrow">O que é esse módulo</p>
            <p className="receita-summary">{r.summary}</p>
          </Card>

          <section className="receita-block">
            <h3 className="receita-block__title"><i data-lucide="scale"></i> Regras de negócio</h3>
            <ul className="receita-rules">
              {r.rules.map((rule, i) => (
                <li key={i}><span className="receita-rules__mk"><i data-lucide="check"></i></span>{rule}</li>
              ))}
            </ul>
          </section>

          <section className="receita-block">
            <div className="receita-prompt__head">
              <h3 className="receita-block__title"><i data-lucide="sparkles"></i> Prompt pronto</h3>
              <Button variant="ghost" size="sm" onClick={copyPrompt}
                leftIcon={<i data-lucide={copied ? 'check' : 'copy'}></i>}>
                {copied ? 'Copiado!' : 'Copiar'}
              </Button>
            </div>
            <pre className="receita-prompt"><code>{r.prompt}</code></pre>
          </section>

          <section className="receita-block">
            <h3 className="receita-block__title"><i data-lucide="list-checks"></i> Passo a passo para montar</h3>
            <StepList steps={r.build.map((b, i) => ({ ...b, status: i === 0 ? 'current' : 'upcoming' }))} />
          </section>
        </div>

        <aside className="receita-aside">
          <Card padding="lg" inverse>
            <p className="ia-eyebrow" style={{ color: 'var(--green-300)' }}>Seu copiloto</p>
            <p className="receita-aside__lead">Tudo pronto pra montar.</p>
            <p className="receita-aside__text">
              Leve o prompt pro Lovable e siga o passo a passo. Travou em alguma parte? Eu te ajudo a ajustar.
            </p>
            <Button variant="accent" fullWidth rightIcon={<i data-lucide="arrow-up-right"></i>}>Montar no Lovable</Button>
            <button className="receita-aside__ghost">Refazer o questionário</button>
          </Card>

          <Callout variant="info" title="Dica">
            Comece com 3 pratos reais antes de cadastrar o cardápio inteiro. Valida a conta sem trabalho à toa.
          </Callout>
        </aside>
      </div>
    </Page>
  );
}

Object.assign(window, { ReceitaScreen });
