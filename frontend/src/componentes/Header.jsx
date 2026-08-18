import { NavLink } from "react-router-dom";
import "./Header.css";

function linkAtivo({ isActive }) {
  return isActive ? "ativo" : "";
}

function Header({ titulo, subtitulo, quantidadeTotal, pedidosAbertos }) {
  return (
    <>
      <header className="titulo">
        <div className="linha-titulo">
          <h1>{titulo}</h1>
          <NavLink
            className="carrinho-header"
            to="/carrinho"
            aria-label="Abrir carrinho"
          >
            <span aria-hidden="true">&#128722;</span>
            <b>{quantidadeTotal || ""}</b>
          </NavLink>
        </div>
        <h2>{subtitulo}</h2>
      </header>

      <nav>
        <NavLink to="/cardapio" className={linkAtivo}>
          Cardapio
        </NavLink>
        <NavLink to="/cozinha" className={linkAtivo}>
          Cozinha <b>{pedidosAbertos || ""}</b>
        </NavLink>
        <NavLink to="/atendentes" className={linkAtivo}>
          Atendentes
        </NavLink>
        <NavLink to="/conta" className={linkAtivo}>
          Minha conta
        </NavLink>
      </nav>
    </>
  );
}

export default Header;
