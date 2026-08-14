function CozinhaPage({ pedidos, status, moeda, avancarPedido }) {
  return (
    <main className="area-cozinha">
      <h2 className="titulo-area">COZINHA</h2>
      <div className="grade-pedidos">
        {pedidos.length ? (
          pedidos.map((pedido) => {
            const proximo = status[status.indexOf(pedido.status) + 1];

            return (
              <article className="pedido" key={pedido.id}>
                <header>
                  <h3>Pedido #{pedido.numero}</h3>
                  <span>{pedido.status}</span>
                </header>
                <div className="pedido-info">
                  <b>{pedido.cliente}</b>
                  <time>{new Date(pedido.criadoEm).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</time>
                </div>
                <ul>
                  {pedido.itens.map((item) => (
                    <li key={item.id}>
                      <b>{item.quantidade}x</b> {item.nome}
                    </li>
                  ))}
                </ul>
                {pedido.observacao && <p className="observacao">{pedido.observacao}</p>}
                <div className="pedido-info">
                  Total <b>{moeda.format(pedido.total)}</b>
                </div>
                <button onClick={() => avancarPedido(pedido.id)}>
                  {proximo === "Entregue" ? "Finalizar e entregar" : `Marcar como ${proximo}`}
                </button>
              </article>
            );
          })
        ) : (
          <div className="vazio">
            <h3>Tudo em dia!</h3>
            <p>Nenhum pedido aguardando preparo.</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default CozinhaPage;
