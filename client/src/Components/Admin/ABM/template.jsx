import React from "react";
import { useQuery } from "react-query";
import styles from "./Recetas.module.css";

const Recetas = () => {
  const getGroups = async (route) => {
    console.log(route);
    const response = await fetch("http://localhost:3001/" + route);
    return response.json();
  };

  const recetas = useQuery("recetas", () => getGroups("receta"));

  const columns = ["Producto", "Ingrediente", "Tipo", "grs", "grs/lt"];

  return (
    <div>
      <h1> Recetas </h1>

      {recetas.status === "loading" && <div> Cargando recetas </div>}
      {recetas.status === "error" && <div> Error al cargar las recetas </div>}
      {recetas.status === "success" && (
        <table className={styles.recetas}>
          {recetas.data?.map((receta) => (
            <tbody>
              <tr>
                {columns?.map((column, index) => (
                  <th key={index}>{column}</th>
                ))}
              </tr>
              {receta?.ingredients.map((ingredient, index) => (
                <tr key={index}>
                  {index === 0 ? (
                    <td>Nombre: {receta.name}</td>
                  ) : index === 1 ? (
                    <td>Tipo: {receta.type}</td>
                  ) : (
                    <td></td>
                  )}
                  <td>{ingredient.name}</td>
                  <td>{ingredient.type}</td>
                  <td>{ingredient.grs}</td>
                  <td>{ingredient.grs / 20}</td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      )}
    </div>
  );
};

export default Recetas;

/*
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
*/
