function ContaPage({ usuario, onSair }) {
  const nome = usuario?.nome || "Cliente";
  const email = usuario?.email || "Nao informado";

  return (
    <main className="pagina-conta">
      <section className="conta-card">
        <div className="avatar">{nome.charAt(0).toUpperCase()}</div>
        <p className="chamada">MINHA CONTA</p>
        <h2>{nome}</h2>
        <p>{email}</p>
        <div className="conta-info">
          <span>Sessao atual</span>
          <strong>Ativa</strong>
        </div>
        <button className="botao-sair" onClick={onSair}>
          Sair da conta
        </button>
      </section>
    </main>
  );
}

export default ContaPage;
