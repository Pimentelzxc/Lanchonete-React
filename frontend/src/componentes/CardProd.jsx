import "./CardProd.css";
import {useState} from "react";

function CardProd({nome,preco,preco_total}) {

   const [quantidade, setCount] = useState(0);

  return (
    <div className="card-prod">
      <h2>{nome}</h2>
      <p>Preço: R${preco}</p>
      <p>Quantidade: {quantidade}</p>
      <p>{preco_total} Total R${preco * quantidade}</p>


      
       <button className="bt_adicionar" id="add" onClick={() => setCount(quantidade + 1)}>➕</button>
       

       
      <button className="btn_prod" onClick={() => {}}>🛒</button>




        <button className="bt_diminuir" id="subtract" onClick={() => 
          {if (quantidade > 0) {
            setCount(quantidade - 1);
          }}
        }>➖</button>

    </div>
  );
}

export default CardProd;
