import CardProd from "../componentes/CardProd";

function CardapioPage({ produtos, carrinho, alterarQuantidade, abrirCarrinho }) {
  return <main className="cards pagina-cardapio">
    <section><h2 className="titulo-area">PRODUTOS</h2><div className="produtos">
      {produtos.map((produto) => <CardProd key={produto.id} {...produto}
        quantidade={carrinho[produto.id] || 0}
        onAdicionar={() => alterarQuantidade(produto.id, 1)}
        onDiminuir={() => alterarQuantidade(produto.id, -1)} />)}
    </div></section>
    <button className="atalho-carrinho" onClick={abrirCarrinho}>Ver carrinho</button>
  </main>;
}

export default CardapioPage;
