import React from "react";
import { useQuery } from "react-query";
import { DownOutlined } from "@ant-design/icons";
import { Badge, Dropdown, Space, Table } from "antd";

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

      /* receta.ingredients.forEach((ingredient, index) => {
        data[index].push({
          name: ingredient.name,
          type: ingredient.type,
          grs: ingredient.grs,
          "grs/lt": ingredient.grs / 20,
        });
      }); */
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
    <>
      <p> ESTAS EN Productos</p>
      <Table
        columns={mainColumns}
        expandable={{
          expandedRowRender,
        }}
        dataSource={mainData}
      />
    </>
  );
};

export default Recetas;
