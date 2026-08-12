import "./Login.css";

function Login() {
  return (
    <div className="login">
      <h2>Login</h2>
      <input type="text" placeholder="Digite Seu Email..." />
      <input type="password" placeholder="Digite Sua Senha..." />
      <button className="btn_login" onClick={() => {}}>Entrar</button>
    </div>
  );
}

export default Login;
