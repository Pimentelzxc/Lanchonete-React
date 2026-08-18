const produtos = [
  [1, "X-Salada", 18, "0% 0%"],
  [2, "X-Burguer", 20, "33.333% 0%"],
  [3, "X-Bacon", 22, "66.666% 0%"],
  [4, "X-Tudo", 25, "100% 0%"],
  [5, "Batata Frita", 10, "0% 100%"],
  [6, "Refrigerante", 6, "33.333% 100%"],
  [7, "Cachorro-Quente", 15, "66.666% 100%"],
  [8, "Milk-shake", 12, "100% 100%"],
].map(([id, nome, preco, foto]) => ({ id, nome, preco, foto }));

const status = ["Recebido", "Em preparo", "Pronto", "Entregue"];
const moeda = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});
const pagina = document.body.dataset.page;

const ler = (chave, padrao) => {
  try {
    return JSON.parse(localStorage.getItem(chave)) || padrao;
  } catch {
    return padrao;
  }
};

const salvar = (chave, valor) => {
  localStorage.setItem(chave, JSON.stringify(valor));
};

const escapar = (valor) =>
  String(valor).replace(
    /[&<>'"]/g,
    (caractere) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      })[caractere],
  );

const usuario = ler("usuario-lanchonete", null);

if (pagina !== "login" && !usuario) {
  location.replace("/pages/login.html");
}

if (pagina === "login" && usuario) {
  location.replace("/pages/cardapio.html");
}

let carrinho = ler("carrinho-lanchonete", {});
let pedidos = ler("pedidos-lanchonete", []);
const selecao = {};

const quantidade = () =>
  Object.values(carrinho).reduce((total, item) => total + item, 0);

function atualizarContadores() {
  document.querySelectorAll("[data-cart-count]").forEach((elemento) => {
    elemento.textContent = quantidade() || "";
  });

  document.querySelectorAll("[data-order-count]").forEach((elemento) => {
    elemento.textContent =
      pedidos.filter((pedido) => pedido.status !== "Entregue").length || "";
  });
}

function cardapio() {
  const area = document.querySelector("#produtos");

  area.innerHTML = produtos
    .map(
      (produto) => `
        <article class="card-prod">
          <div
            class="foto-produto"
            style="background-position:${produto.foto}"
            role="img"
            aria-label="Foto de ${produto.nome}"
          ></div>
          <h2>${produto.nome}</h2>
          <p>Preco: ${moeda.format(produto.preco)}</p>
          <p>Quantidade: <b id="q-${produto.id}">0</b></p>
          <p>Total: <span id="t-${produto.id}">${moeda.format(0)}</span></p>
          <div class="botoes">
            <button data-add="${produto.id}">+</button>
            <button
              data-buy="${produto.id}"
              title="Adicionar quantidade escolhida ao carrinho"
            >&#128722;</button>
            <button data-sub="${produto.id}">-</button>
          </div>
        </article>
      `,
    )
    .join("");

  area.addEventListener("click", (event) => {
    const id = Number(
      event.target.dataset.add ||
        event.target.dataset.sub ||
        event.target.dataset.buy,
    );

    if (!id) return;

    const produto = produtos.find((item) => item.id === id);

    if (event.target.dataset.buy) {
      const unidades = selecao[id] || 1;
      carrinho[id] = (carrinho[id] || 0) + unidades;
      salvar("carrinho-lanchonete", carrinho);
      selecao[id] = 0;
      atualizarContadores();
    } else {
      selecao[id] = Math.max(
        0,
        (selecao[id] || 0) + (event.target.dataset.add ? 1 : -1),
      );
    }

    document.querySelector(`#q-${id}`).textContent = selecao[id] || 0;
    document.querySelector(`#t-${id}`).textContent = moeda.format(
      produto.preco * (selecao[id] || 0),
    );
  });
}

function carrinhoPage() {
  const area = document.querySelector("#itens-carrinho");
  const itens = produtos
    .filter((produto) => carrinho[produto.id])
    .map((produto) => ({
      ...produto,
      quantidade: carrinho[produto.id],
    }));
  const total = itens.reduce(
    (soma, produto) => soma + produto.preco * produto.quantidade,
    0,
  );

  area.innerHTML = itens.length
    ? itens
        .map(
          (produto) => `
            <div class="item">
              <span>
                <b>${produto.quantidade}x ${produto.nome}</b>
                <small>${moeda.format(produto.preco)} cada</small>
              </span>
              <div class="acoes-item">
                <strong>
                  ${moeda.format(produto.preco * produto.quantidade)}
                </strong>
                <button
                  class="remover-item"
                  data-remove="${produto.id}"
                  aria-label="Remover ${produto.nome} do carrinho"
                >
                  Remover
                </button>
              </div>
            </div>
          `,
        )
        .join("")
    : `
        <div class="vazio">
          <p>Seu carrinho esta vazio.</p>
          <a href="/pages/cardapio.html">Voltar ao cardapio</a>
        </div>
      `;

  document.querySelector("#total").textContent = moeda.format(total);

  area.onclick = (event) => {
    const id = Number(event.target.dataset.remove);

    if (!id) return;

    delete carrinho[id];
    salvar("carrinho-lanchonete", carrinho);
    carrinhoPage();
    atualizarContadores();
  };

  document.querySelector("#enviar-pedido").onclick = () => {
    const mensagem = document.querySelector("#mensagem");

    if (!itens.length) {
      mensagem.textContent = "Adicione pelo menos um item.";
      return;
    }

    const numero = Math.max(0, ...pedidos.map((pedido) => pedido.numero)) + 1;

    pedidos.unshift({
      id: Date.now(),
      numero,
      cliente: document.querySelector("#cliente").value.trim() || "Balcao",
      observacao: document.querySelector("#observacao").value.trim(),
      itens,
      total,
      status: status[0],
      criadoEm: new Date().toISOString(),
    });

    salvar("pedidos-lanchonete", pedidos);
    carrinho = {};
    salvar("carrinho-lanchonete", carrinho);
    location.href = "/pages/cozinha.html";
  };
}

function cozinha() {
  const area = document.querySelector("#pedidos");
  const abertos = pedidos.filter((pedido) => pedido.status !== "Entregue");

  area.innerHTML = abertos.length
    ? abertos
        .map((pedido) => {
          const proximo = status[status.indexOf(pedido.status) + 1];
          const horario = new Date(pedido.criadoEm).toLocaleTimeString(
            "pt-BR",
            {
              hour: "2-digit",
              minute: "2-digit",
            },
          );
          const itensHtml = pedido.itens
            .map((item) => `<li><b>${item.quantidade}x</b> ${item.nome}</li>`)
            .join("");
          const observacaoHtml = pedido.observacao
            ? `<p class="observacao">${escapar(pedido.observacao)}</p>`
            : "";
          const textoBotao =
            proximo === "Entregue"
              ? "Finalizar e entregar"
              : `Marcar como ${proximo}`;

          return `
            <article class="pedido">
              <header>
                <h3>Pedido #${pedido.numero}</h3>
                <span>${pedido.status}</span>
              </header>
              <div class="pedido-info">
                <b>${escapar(pedido.cliente)}</b>
                <time>${horario}</time>
              </div>
              <ul>${itensHtml}</ul>
              ${observacaoHtml}
              <div class="pedido-info">
                Total <b>${moeda.format(pedido.total)}</b>
              </div>
              <button data-next="${pedido.id}">${textoBotao}</button>
            </article>
          `;
        })
        .join("")
    : `
        <div class="vazio">
          <h3>Tudo em dia!</h3>
          <p>Nenhum pedido aguardando preparo.</p>
        </div>
      `;

  area.onclick = (event) => {
    const id = Number(event.target.dataset.next);

    if (!id) return;

    pedidos = pedidos.map((pedido) =>
      pedido.id !== id
        ? pedido
        : {
            ...pedido,
            status:
              status[
                Math.min(status.indexOf(pedido.status) + 1, status.length - 1)
              ],
          },
    );

    salvar("pedidos-lanchonete", pedidos);
    cozinha();
    atualizarContadores();
  };
}

function login() {
  document.querySelector("#form-login").onsubmit = (event) => {
    event.preventDefault();

    const nome =
      document.querySelector("#nome-login").value.trim() || "Cliente";
    const email =
      document.querySelector("#email-login").value.trim() || "Nao informado";

    salvar("usuario-lanchonete", { nome, email });
    location.href = "/pages/cardapio.html";
  };
}

function conta() {
  document.querySelector("#nome-conta").textContent = usuario.nome;
  document.querySelector("#email-conta").textContent = usuario.email;
  document.querySelector("#avatar-conta").textContent = usuario.nome
    .charAt(0)
    .toUpperCase();
  document.querySelector("#deslogar").onclick = () => {
    localStorage.removeItem("usuario-lanchonete");
    location.replace("/pages/login.html");
  };
}

atualizarContadores();

if (pagina === "login" && !usuario) login();
if (pagina === "cardapio") cardapio();
if (pagina === "carrinho") carrinhoPage();
if (pagina === "cozinha") cozinha();
if (pagina === "conta" && usuario) conta();
