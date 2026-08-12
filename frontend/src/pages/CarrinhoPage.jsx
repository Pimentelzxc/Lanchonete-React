function CarrinhoPage({ itens, quantidadeTotal, total, moeda, cliente, setCliente, observacao, setObservacao, mensagem, enviarPedido }) {
  return <main className="pagina-carrinho"><aside className="carrinho">
    <div className="carrinho-titulo"><h2>Carrinho</h2><b>{quantidadeTotal}</b></div>
    {itens.length ? <div className="itens-carrinho">{itens.map((item) => <div className="item-carrinho" key={item.id}><span>{item.quantidade}× {item.nome}</span><strong>{moeda.format(item.preco * item.quantidade)}</strong></div>)}</div> : <p>Seu carrinho está vazio.</p>}
    <label>Cliente / mesa<input value={cliente} onChange={(e) => setCliente(e.target.value)} /></label>
    <label>Observações<textarea value={observacao} onChange={(e) => setObservacao(e.target.value)} /></label>
    <div className="total"><span>Total</span><strong>{moeda.format(total)}</strong></div>
    <button onClick={enviarPedido}>Enviar para a cozinha</button>{mensagem && <p>{mensagem}</p>}
  </aside></main>;
}

export default CarrinhoPage;
