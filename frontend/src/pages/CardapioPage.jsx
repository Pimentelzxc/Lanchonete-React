import { useState } from "react";
import CardProd from "../componentes/CardProd";

function CardapioPage({ produtos, moeda, adicionarAoCarrinho, abrirCarrinho }) {
  const [selecionados, setSelecionados] = useState({});

  const alterarSelecionado = (id, delta) => {
    setSelecionados((atuais) => ({
      ...atuais,
      [id]: Math.max(0, (atuais[id] || 0) + delta),
    }));
  };

  const comprarProduto = (id) => {
    const quantidade = selecionados[id] || 1;

    adicionarAoCarrinho(id, quantidade);
    setSelecionados((atuais) => ({
      ...atuais,
      [id]: 0,
    }));
  };

  return (
    <main className="cards pagina-cardapio">
      <section>
        <h2 className="titulo-area">PRODUTOS</h2>
        <div className="produtos">
          {produtos.map((produto) => (
            <CardProd
              key={produto.id}
              {...produto}
              quantidade={selecionados[produto.id] || 0}
              moeda={moeda}
              onAdicionar={() => alterarSelecionado(produto.id, 1)}
              onDiminuir={() => alterarSelecionado(produto.id, -1)}
              onComprar={() => comprarProduto(produto.id)}
            />
          ))}
        </div>
      </section>
      <button className="atalho-carrinho" onClick={abrirCarrinho}>
        Ver carrinho
      </button>
    </main>
  );
}

export default CardapioPage;
