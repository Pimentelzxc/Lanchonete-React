import { Link } from "react-router-dom";

function CarrinhoPage({
  itens,
  quantidadeTotal,
  total,
  moeda,
  cliente,
  setCliente,
  observacao,
  setObservacao,
  mensagem,
  enviarPedido,
  removerItem,
}) {
  return (
    <main className="pagina-carrinho">
      <aside className="carrinho">
        <div className="carrinho-titulo">
          <h2>Carrinho</h2>
          <b>{quantidadeTotal}</b>
        </div>

        {itens.length ? (
          <div className="itens-carrinho">
            {itens.map((item) => (
              <div className="item" key={item.id}>
                <span>
                  <b>{item.quantidade}x {item.nome}</b>
                  <small>{moeda.format(item.preco)} cada</small>
                </span>
                <div className="acoes-item">
                  <strong>{moeda.format(item.preco * item.quantidade)}</strong>
                  <button className="remover-item" onClick={() => removerItem(item.id)}>
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="vazio">
            <p>Seu carrinho esta vazio.</p>
            <Link to="/cardapio">Voltar ao cardapio</Link>
          </div>
        )}

        <label>
          Cliente / mesa
          <input value={cliente} onChange={(event) => setCliente(event.target.value)} placeholder="Ex.: Mesa 04 ou Joao" />
        </label>
        <label>
          Observacoes
          <textarea
            value={observacao}
            onChange={(event) => setObservacao(event.target.value)}
            rows="2"
            placeholder="Ex.: sem cebola"
          />
        </label>
        <div className="total">
          <span>Total</span>
          <strong>{moeda.format(total)}</strong>
        </div>
        <button className="botao-principal" onClick={enviarPedido}>
          Enviar para a cozinha
        </button>
        {mensagem && <p>{mensagem}</p>}
      </aside>
    </main>
  );
}

export default CarrinhoPage;
