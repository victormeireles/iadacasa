/* IA da Casa — Módulo + questionário guiado */
const DS = window.IADaCasaDesignSystem_449ba5;

function ModuloScreen({ data, module, onBack, onGenerate }) {
  const { Input, Textarea, Select, Checkbox, Button, StepList, Callout, Badge } = DS;
  const m = module || data.modules[0];

  return (
    <Page width="lg">
      <button className="ia-back" onClick={onBack}>
        <i data-lucide="arrow-left"></i> Voltar ao cardápio
      </button>

      <div className="modulo-layout">
        <aside className="modulo-aside">
          <div className={`modulo-aside__head mod-${m.accent}`}>
            <span className="modulo-aside__icon"><i data-lucide={m.icon}></i></span>
            <div>
              <p className="ia-eyebrow">Módulo</p>
              <h2 className="modulo-aside__title">{m.title}</h2>
            </div>
          </div>
          <p className="modulo-aside__desc">{m.desc}</p>
          <div className="modulo-aside__steps">
            <StepList steps={data.steps} />
          </div>
        </aside>

        <section className="modulo-main">
          <div className="modulo-main__head">
            <p className="ia-eyebrow">Passo 2 de 4 · Questionário</p>
            <h1 className="modulo-main__title">Conte como funciona hoje</h1>
            <p className="modulo-main__lead">
              Sem termos técnicos. Responda do seu jeito — o copiloto traduz pra um sistema depois.
            </p>
          </div>

          <Callout variant="ai" title="Por que perguntamos isso?">
            Quanto melhor a gente entende a sua operação, mais a Receita do Sistema vai ter a cara do seu restaurante.
          </Callout>

          <div className="modulo-form">
            {data.questions.map((q) => {
              if (q.kind === 'select') {
                return <Select key={q.id} label={q.label} options={q.options} defaultValue={q.value} />;
              }
              if (q.kind === 'input') {
                return <Input key={q.id} label={q.label} placeholder={q.placeholder} defaultValue={q.value} hint={q.hint} />;
              }
              if (q.kind === 'textarea') {
                return <Textarea key={q.id} label={q.label} placeholder={q.placeholder} defaultValue={q.value} rows={3} />;
              }
              if (q.kind === 'checks') {
                return (
                  <div key={q.id} className="ia-field">
                    <span className="ia-field__label" style={{ fontSize: 'var(--fs-body-sm)', fontWeight: 'var(--fw-semibold)' }}>{q.label}</span>
                    <div className="modulo-checks">
                      {q.options.map((o, i) => <Checkbox key={i} label={o.label} defaultChecked={o.checked} />)}
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>

          <div className="modulo-actions">
            <Button variant="ghost" onClick={onBack}>Salvar e sair</Button>
            <Button variant="primary" size="lg" rightIcon={<i data-lucide="sparkles"></i>} onClick={onGenerate}>
              Gerar a Receita do Sistema
            </Button>
          </div>
        </section>
      </div>
    </Page>
  );
}

Object.assign(window, { ModuloScreen });
