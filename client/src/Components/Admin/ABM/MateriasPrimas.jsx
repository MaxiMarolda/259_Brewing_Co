import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import CustomTable from "../../assets/CustomTable";
import ModalForm from "../../assets/ModalForm";

const Usuarios = () => {
  const getMateriasPrimas = async (route) => {
    const response = await fetch("http://localhost:3001/" + route);
    return response.json();
  };

  let materiasPrimas = useQuery("materiasPrimas", () => getMateriasPrimas("materiaprima"), {
    refetchOnWindowFocus: false,
  });

  const columns = [
    {
      title: "name",
      dataIndex: "name",
      width: "30%",
      editable: true,
    },
    {
      title: "type",
      dataIndex: "type",
      editable: true,
    },
    {
      title: "amount",
      dataIndex: "amount",
      editable: true,
    },
    {
      title: "size",
      dataIndex: "size",
      editable: true,
    },
  ];

  const [dataSource, setDataSource] = useState([]);
  const handleData = () => {
    let data = [];
    if (materiasPrimas?.status === "success") {
      data = materiasPrimas.data?.map((materiaPrima) => {
        return {
          key: materiaPrima._id,
          _id: materiaPrima._id,
          name: materiaPrima.name,
          type: materiaPrima.type,
          amount: materiaPrima.amount,
          size: materiaPrima.size,
        };
      });
    }
    return data;
  };

  useEffect(() => {
    setDataSource(handleData());
    return () => {
      materiasPrimas.refetch(); //  To update materiasPrimas and re-render when navigating through components
    };
  }, [materiasPrimas.status]);

  return (
    <div>
      <ModalForm
        inputs={{
          string: [{ name: 1 }, { type: 1 }],
          number: [{ amount: 1 }, { size: 1 }],
        }}
        route={"materiaPrima"}
      />
      <p></p>
      {dataSource.length ? (
        <CustomTable
          dataColumns={columns}
          originData={dataSource}
          updateRoute="materiaprima"
          deleteRoute="materiaPrima"
        />
      ) : (
        <div>Cargando</div>
      )}
    </div>
  );
};

export default Usuarios;
