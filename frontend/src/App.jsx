import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useMemo, useState } from "react";
import Header from "./componentes/Header";
import AtendentesPage from "./pages/AtendentesPage";
import CardapioPage from "./pages/CardapioPage";
import CarrinhoPage from "./pages/CarrinhoPage";
import ContaPage from "./pages/ContaPage";
import CozinhaPage from "./pages/CozinhaPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import "./App.css";

const produtos = [
  { id: 1, nome: "X-Salada", preco: 18, foto: "0% 0%" },
  { id: 2, nome: "X-Burguer", preco: 20, foto: "33.333% 0%" },
  { id: 3, nome: "X-Bacon", preco: 22, foto: "66.666% 0%" },
  { id: 4, nome: "X-Tudo", preco: 25, foto: "100% 0%" },
  { id: 5, nome: "Batata Frita", preco: 10, foto: "0% 100%" },
  { id: 6, nome: "Refrigerante", preco: 6, foto: "33.333% 100%" },
  { id: 7, nome: "Cachorro-Quente", preco: 15, foto: "66.666% 100%" },
  { id: 8, nome: "Milk-shake", preco: 12, foto: "100% 100%" },
];

const statusPedido = ["Recebido", "Em preparo", "Pronto", "Entregue"];
const moeda = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function lerStorage(chave, padrao) {
  try {
    return JSON.parse(localStorage.getItem(chave)) || padrao;
  } catch {
    return padrao;
  }
}

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [usuario, setUsuario] = useState(() =>
    lerStorage("usuario-lanchonete", null),
  );
  const [carrinho, setCarrinho] = useState(() =>
    lerStorage("carrinho-lanchonete", {}),
  );
  const [pedidos, setPedidos] = useState(() =>
    lerStorage("pedidos-lanchonete", []),
  );
  const [cliente, setCliente] = useState("");
  const [observacao, setObservacao] = useState("");
  const [mensagem, setMensagem] = useState("");

  const salvarUsuario = (novoUsuario) => {
    localStorage.setItem("usuario-lanchonete", JSON.stringify(novoUsuario));
    setUsuario(novoUsuario);

    if (novoUsuario.tipo === "admin") {
      navigate("/cozinha");
    } else {
      navigate("/cardapio");
    }
  };

  const salvarCarrinho = (novoCarrinho) => {
    localStorage.setItem("carrinho-lanchonete", JSON.stringify(novoCarrinho));
    setCarrinho(novoCarrinho);
  };

  const salvarPedidos = (novosPedidos) => {
    localStorage.setItem("pedidos-lanchonete", JSON.stringify(novosPedidos));
    setPedidos(novosPedidos);
  };

  const adicionarAoCarrinho = (id, quantidade) => {
    const proximoCarrinho = {
      ...carrinho,
      [id]: (carrinho[id] || 0) + quantidade,
    };

    salvarCarrinho(proximoCarrinho);
  };

  const alterarQuantidade = (id, delta) => {
    const atual = carrinho[id] || 0;
    const proximaQuantidade = Math.max(0, atual + delta);
    const proximoCarrinho = { ...carrinho };

    if (proximaQuantidade === 0) {
      delete proximoCarrinho[id];
    } else {
      proximoCarrinho[id] = proximaQuantidade;
    }

    salvarCarrinho(proximoCarrinho);
  };

  const itens = useMemo(
    () =>
      produtos
        .filter((produto) => carrinho[produto.id])
        .map((produto) => ({ ...produto, quantidade: carrinho[produto.id] })),
    [carrinho],
  );

  const quantidadeTotal = itens.reduce(
    (totalItens, item) => totalItens + item.quantidade,
    0,
  );
  const total = itens.reduce(
    (soma, item) => soma + item.preco * item.quantidade,
    0,
  );
  const pedidosAbertos = pedidos.filter(
    (pedido) => pedido.status !== "Entregue",
  );

  const enviarPedido = () => {
    if (!itens.length) {
      setMensagem("Adicione pelo menos um item.");
      return;
    }

    const novoPedido = {
      id: Date.now(),
      numero: Math.max(0, ...pedidos.map((pedido) => pedido.numero)) + 1,
      cliente: cliente.trim() || usuario?.nome || "Balcao",
      observacao: observacao.trim(),
      itens,
      total,
      status: statusPedido[0],
      criadoEm: new Date().toISOString(),
    };

    salvarPedidos([novoPedido, ...pedidos]);
    salvarCarrinho({});
    setCliente("");
    setObservacao("");
    setMensagem("");
    navigate("/cozinha");
  };

  const avancarPedido = (id) => {
    salvarPedidos(
      pedidos.map((pedido) => {
        if (pedido.id !== id) return pedido;
        const indiceAtual = statusPedido.indexOf(pedido.status);
        return {
          ...pedido,
          status:
            statusPedido[Math.min(indiceAtual + 1, statusPedido.length - 1)],
        };
      }),
    );
  };

  const deslogar = () => {
    localStorage.removeItem("usuario-lanchonete");
    setUsuario(null);
    navigate("/login");
  };

  const mostrarHeader = location.pathname !== "/login";

  return (
    <>
      {mostrarHeader && (
        <Header
          titulo="Lanchonete Do Pimentel"
          subtitulo="O lugar preferido do professor Stati"
          quantidadeTotal={quantidadeTotal}
          pedidosAbertos={pedidosAbertos.length}
        />
      )}

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage onEntrar={salvarUsuario} />} />
        <Route
          path="/cardapio"
          element={
            <CardapioPage
              produtos={produtos}
              moeda={moeda}
              adicionarAoCarrinho={adicionarAoCarrinho}
              abrirCarrinho={() => navigate("/carrinho")}
            />
          }
        />
        <Route
          path="/carrinho"
          element={
            <CarrinhoPage
              itens={itens}
              quantidadeTotal={quantidadeTotal}
              total={total}
              moeda={moeda}
              cliente={cliente}
              setCliente={setCliente}
              observacao={observacao}
              setObservacao={setObservacao}
              mensagem={mensagem}
              enviarPedido={enviarPedido}
              removerItem={(id) => alterarQuantidade(id, -(carrinho[id] || 0))}
            />
          }
        />
        <Route
          path="/cozinha"
          element={
            <CozinhaPage
              pedidos={pedidosAbertos}
              status={statusPedido}
              moeda={moeda}
              avancarPedido={avancarPedido}
            />
          }
        />
        <Route path="/atendentes" element={<AtendentesPage />} />
        <Route
          path="/conta"
          element={<ContaPage usuario={usuario} onSair={deslogar} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
