import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <main className="pagina-erro">
      <h2>Pagina nao encontrada</h2>
      <p>Essa rota nao existe na lanchonete.</p>
      <Link to="/cardapio">Voltar ao cardapio</Link>
    </main>
  );
}

export default NotFoundPage;
