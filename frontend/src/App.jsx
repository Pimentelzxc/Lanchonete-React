import Header from "./componentes/Header";
import Login from "./componentes/Login";
import CardProd from "./componentes/CardProd";
import Contador from "./componentes/Contador";
import "./App.css";

function App() {
  return (
    <>
      <Header
        titulo="Lanchonete Do Pimentel"
        subtitulo="O melhor lugar para saborear um lanche delicioso!"
      />

      <Login />

      <section className="cards">
        <div className="produtos">
          <CardProd nome="X-Salada" preco={18.00} quantidade="0"  />
          <CardProd nome="X-Burguer" preco={20.00} quantidade="0" />
          <CardProd nome="X-Bacon" preco={22.00} quantidade="0" />
          <CardProd nome="X-Tudo" preco={25.00} quantidade="0" />
          <CardProd nome="Batata Frita" preco={10.00} quantidade="0" />
          <CardProd nome="Refrigerante" preco={6.00} quantidade="0" />
        </div>

        <div className="card-funcionario">
          <h2>ATENDENTE</h2>
          <p>PIMENTEL</p>
        </div>
      </section>
    </>
  );
}

export default App;
