import Login from "./componentes/Login";
import { useState } from "react";
import "./App.css";
import Cellflix from "./componentes/Cellflix";


function App() {


  //autenticacion
  const [autenticado, setAutenticado] = useState(false);

return (
  <>
    {autenticado ? (
      <Cellflix />
    ) : (
      <Login onLogin={() => setAutenticado(true)} />
    )}
  </>
);
}

export default App;