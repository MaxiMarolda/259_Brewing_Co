import React from "react";
import { useQuery } from "react-query";
import { Table } from "antd";

const Recetas = () => {
  const getRecetas = async (route) => {
    const response = await fetch("http://localhost:3001/" + route);
    return response.json();
  };

  const recetas = useQuery("recetas", () => getRecetas("receta"));

  const expandedRowRender = () => {
    const columns = [
      {
        title: "Ingrediente",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Tipo",
        dataIndex: "type",
        key: "type",
      },
      {
        title: "grs",
        dataIndex: "grs",
        key: "grs",
      },
      {
        title: "grs/lt",
        dataIndex: "grs/lt",
        key: "grs/lt",
      },
    ];

    let data = [];

    recetas.data?.forEach((receta) => {
      data = receta.ingredients.map((ingredient, index) => ({
        key: index.toString(),
        name: ingredient.name,
        type: ingredient.type,
        grs: ingredient.grs,
        "grs/lt": ingredient.grs / 20,
      }));
    });
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const mainColumns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tipo",
      dataIndex: "type",
      key: "type",
    },
  ];

  const mainData = [];

  recetas.data?.forEach((receta, index) => {
    mainData.push({
      key: index.toString(),
      name: receta.name,
      type: receta.type,
    });
  });

  return (
    <Table
      columns={mainColumns}
      expandable={{
        expandedRowRender,
      }}
      dataSource={mainData}
      scroll={{
        y: "65vh",
      }}
    />
  );
};

export default Recetas;
