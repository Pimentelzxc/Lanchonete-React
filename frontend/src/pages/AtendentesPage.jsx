function AtendentesPage() {
  return (
    <main className="pagina-atendentes">
      <h2 className="titulo-area">ATENDENTES</h2>
      <section className="atendentes">
        <article className="card-funcionario">
          <div className="moldura-foto">
            <img
              src="/images/kirito-atendente.png"
              alt="Kirito como atendente da lanchonete"
            />
          </div>
          <div className="info-atendente">
            <span>ATENDENTE</span>
            <h2>KIRITO</h2>
            <p>Especialista em pedidos</p>
          </div>
        </article>

        <article className="card-funcionario destaque">
          <div className="moldura-foto">
            <img
              src="/images/asuna-atendente.png"
              alt="Asuna como atendente da lanchonete"
            />
          </div>
          <div className="info-atendente">
            <span>GERENTE</span>
            <h2>ASUNA</h2>
            <p>Atendimento e qualidade</p>
          </div>
        </article>

        <article className="card-funcionario">
          <div className="moldura-foto">
            <img
              src="/images/sinon-atendente.png"
              alt="Sinon como atendente da lanchonete"
            />
          </div>
          <div className="info-atendente">
            <span>ATENDENTE</span>
            <h2>SINON</h2>
            <p>Agilidade nos pedidos</p>
          </div>
        </article>
      </section>
    </main>
  );
}

export default AtendentesPage;
