function CozinhaPage({ pedidos, status, moeda, avancarPedido }) {
  return <main className="area-cozinha"><h2>COZINHA</h2>
    <div className="grade-pedidos">{pedidos.map((pedido) => {
      const proximo = status[status.indexOf(pedido.status) + 1];
      return <article className="pedido" key={pedido.id}><header><h3>Pedido #{pedido.numero}</h3><span>{pedido.status}</span></header>
        <strong>{pedido.cliente}</strong><ul>{pedido.itens.map((item) => <li key={item.id}>{item.quantidade}× {item.nome}</li>)}</ul>
        <p>Total: {moeda.format(pedido.total)}</p><button onClick={() => avancarPedido(pedido.id)}>{proximo === "Entregue" ? "Finalizar e entregar" : `Marcar como ${proximo}`}</button>
      </article>;
    })}</div>
  </main>;
}

export default CozinhaPage;
