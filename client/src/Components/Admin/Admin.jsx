import React, { useState } from "react";

import Barriles from "./ABM/Barriles";
import Fermentadores from "./ABM/Fermentadores";
import MateriasPrimas from "./ABM/MateriasPrimas";
import Productos from "./ABM/Productos";
import Recetas from "./ABM/Recetas";
import Usuarios from "./ABM/Usuarios";

const Admin = () => {
  const [activeComponent, setActiveComponent] = useState(-1);

  const components = [<Barriles />, <Fermentadores />, <MateriasPrimas />, <Productos />, <Recetas />, <Usuarios />];

  const createMenu = () => {
    return components.map((component, index) => (
      <button key={index} name={component.type.name} type="button" onClick={() => setActiveComponent(index)}>
        {component.type.name}
      </button>
    ));
  };

  return (
    <div>
      <p> ESTAS EN Admin</p>
      {createMenu()}
      {activeComponent > -1 && components[activeComponent]}
    </div>
  );
};

export default Admin;
