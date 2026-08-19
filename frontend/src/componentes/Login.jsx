import { useState } from "react";
import "./Login.css";

function Login({ onEntrar }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const entrar = (event) => {
    event.preventDefault();

    const nomeDigitado = nome.trim();
    const emailDigitado = email.trim();
    const senhaDigitada = senha.trim();
    const nomeFormatado = nomeDigitado.toLowerCase();
    const emailFormatado = emailDigitado.toLowerCase();

    if (
      (nomeFormatado === "admin" ||
        emailFormatado === "admin@lanchonete.com") &&
      senhaDigitada === "admin"
    ) {
      onEntrar({
        nome: nomeDigitado || "Admin",
        email: emailDigitado || "admin@lanchonete.com",
        tipo: "admin",
      });
    } else {
      onEntrar({
        nome: nomeDigitado || "Cliente",
        email: emailDigitado || "Nao informado",
        tipo: "cliente",
      });
    }
  };

  return (
    <form className="login" onSubmit={entrar}>
      <label>
        Nome
        <input
          value={nome}
          onChange={(event) => setNome(event.target.value)}
          placeholder="Digite seu nome"
        />
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
        <input
          value={senha}
          onChange={(event) => setSenha(event.target.value)}
          type="password"
          placeholder="Digite sua senha"
        />
      </label>

      <p className="mensagem-login">Acesse o cardapio e faca seu pedido.</p>

      <button className="btn_login" type="submit">
        Entrar
      </button>
    </form>
  );
}

export default Login;
