import { useState } from "react";

function LoginPage({ onEntrar }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  const entrar = (event) => {
    event.preventDefault();
    onEntrar({
      nome: nome.trim() || "Cliente",
      email: email.trim() || "Nao informado",
    });
  };

  return (
    <main className="pagina-login">
      <section className="login-premium">
        <img
          className="selo-login foto-lanchonete-login"
          src="/images/lanchonete-login.png"
          alt="Fachada da Lanchonete do Pimentel"
        />
        <p className="chamada">BEM-VINDO</p>
        <h1>Lanchonete do Pimentel</h1>
        <p>O lugar preferido do professor Stati</p>

        <form onSubmit={entrar}>
          <label>
            Nome
            <input value={nome} onChange={(event) => setNome(event.target.value)} placeholder="Digite seu nome" />
          </label>
          <label>
            E-mail
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              placeholder="nome@email.com"
            />
          </label>
          <label>
            Senha
            <input type="password" placeholder="Digite sua senha" />
          </label>
          <p className="mensagem-login">Acesse o cardapio e faca seu pedido.</p>
          <button type="submit">Entrar</button>
        </form>
      </section>
    </main>
  );
}

export default LoginPage;
