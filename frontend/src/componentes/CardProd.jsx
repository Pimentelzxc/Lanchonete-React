import "./CardProd.css";

function CardProd({ nome, preco, foto, quantidade, moeda, onAdicionar, onDiminuir, onComprar }) {
  return (
    <div className="card-prod">
      <div
        className="foto-produto"
        style={{ backgroundPosition: foto }}
        role="img"
        aria-label={`Foto de ${nome}`}
      />
      <h2>{nome}</h2>
      <p>Preco: {moeda.format(preco)}</p>
      <p>Quantidade: {quantidade}</p>
      <p>Total: {moeda.format(preco * quantidade)}</p>

      <div className="botoes">
        <button className="bt_adicionar" onClick={onAdicionar}>
          +
        </button>
        <button className="btn_prod" onClick={onComprar} aria-label={`Adicionar ${nome} ao carrinho`}>
          <span aria-hidden="true">&#128722;</span>
        </button>
        <button className="bt_diminuir" onClick={onDiminuir}>
          -
        </button>
      </div>
    </div>
  );
}

export default CardProd;
