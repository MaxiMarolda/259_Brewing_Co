import React from "react";
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div>
      <p> ESTAS EN EL MODULO DE PRODUCCION</p>
      <Link to='/'>
        <button >Volver</button>
      </Link>
    </div>
  );
};

export default Home;
