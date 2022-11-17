import React from "react";
import { useQuery } from "react-query";

const Recetas = () => {
  const getGroups = async (route) => {
    console.log(route);
    const response = await fetch("http://localhost:3001/" + route);
    return response.json();
  };

  const recetas = useQuery("recetas", () => getGroups("receta"));

  return (
    <div>
      <p> ESTAS EN Recetas</p>

      {recetas.status === "loading" && <div> Cargando recetas </div>}
      {recetas.status === "error" && <div> Error al cargar las recetas </div>}
      {recetas.status === "success" &&
        recetas.data?.map((receta) => (
          <div key={receta._id}>
            <h2>
              {receta.name} {receta.type}
            </h2>
            <ul>
              <li>Nombre - Tipo - grs - grs/lt</li>
              {receta?.ingredients.map((ingredient) => {
                return (
                  <li>
                    {ingredient.name} {" - "}
                    {ingredient.type} {" - "}
                    {ingredient.grs} {" - "}
                    {ingredient.grs / 20}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
    </div>
  );
};

export default Recetas;

/*
const Recetas = () => {
  const getData = async (route) => {
    console.log("@@", route);
    const response = await fetch(`http://localhost:3001/receta`);
    return response.json();
  };

  const { data, status } = useQuery("recetas", getData());

  //const { data, status } = useQuery("recetas", getData);

  //const materiasPrimas = useQuery("materiasPrimas", getData("materiaprima"));

  return (
    <div>
      <p> ESTAS EN Recetas</p>
      {status === "loading" && <div> Cargando recetas </div>}
      {status === "error" && <div> Error al cargar las recetas </div>}
      {status === "success" &&
        data?.map((receta) => (
          <p key={receta._id}>
            {receta.name} {receta.type} {receta.ingredients[0].grs}
          </p>
        ))}
      {materiasPrimas.status === "loading" && <div> Cargando materia prima </div>}
      {materiasPrimas.status === "error" && <div> Error al cargar las materia prima </div>}
      {materiasPrimas.status === "success" &&
        materiasPrimas.data?.map((materiaPrima) => (
          <p key={materiaPrima._id}>
            {materiaPrima.name} {materiaPrima.type}
          </p>
        ))}
        </div>
        );
      };
      
      export default Recetas;   
*/
