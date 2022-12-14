import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Table } from "antd";
import CustomTable from "../../assets/CustomTable";

const Recetas = () => {
  const getRecetas = async (route) => {
    const response = await fetch("http://localhost:3001/" + route);
    return response.json();
  };

  const recetas = useQuery("recetas", () => getRecetas("receta"), {
    refetchOnWindowFocus: false,
  });

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

  /*   const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setDataSource(mainData);
    return () => {
      recetas.refetch(); //  To update materiasPrimas and re-render when navigating through components
    };
  }, [recetas.status]); */

  return (
    <div>
      {/* dataColumns, originData, updateRoute, deleteRoute, tableShouldUpdate */}
      {console.log("recetas: ", recetas)}
      {recetas?.data?.length ? (
        <CustomTable
          updateRoute="receta"
          deleteRoute="receta"
          originData={mainData}
          dataColumns={mainColumns}
          expandir={true}
          expandable={{
            expandedRowRender,
          }}
        />
      ) : (
        <div>Cargando</div>
      )}
    </div>
  );
};

export default Recetas;
