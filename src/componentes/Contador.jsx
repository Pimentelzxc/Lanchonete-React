import { useState } from "react";

function Contador() {
    const [count, setCount] = useState(0);

    return (
        <>
     <h1>{count}</h1>

        <button onClick={() => setCount(count + 1)}>adicionar</button>
        <button onClick={() => setCount(count - 1)}>diminuir</button>
        </>
    );
}

export default Contador;