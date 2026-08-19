import Login from "../componentes/Login";

function LoginPage({ onEntrar }) {
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

        <Login onEntrar={onEntrar} />
      </section>
    </main>
  );
}

export default LoginPage;
