import React from "react";
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <p> ESTAS EN HOME</p>
      <Link to='/admin'>
        <button >Admin</button>
      </Link>
      <Link to='/production'>
        <button >Producción</button>
      </Link>
    </div>
  );
};

export default Home;
