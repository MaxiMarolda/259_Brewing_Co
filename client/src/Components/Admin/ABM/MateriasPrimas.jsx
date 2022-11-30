import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import CustomTable from "../../assets/CustomTable";
import ModalForm from "../../assets/ModalForm";

const MateriasPrimas = () => {
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

  const mapData = (data) => {
    return data.map((materiaPrima) => {
      return {
        key: materiaPrima._id,
        _id: materiaPrima._id,
        name: materiaPrima.name,
        type: materiaPrima.type,
        amount: materiaPrima.amount,
        size: materiaPrima.size,
      };
    });
  };
  const handleData = () => {
    if (materiasPrimas?.status === "success") {
      const data = mapData(materiasPrimas.data);
      return data;
    }
  };

  useEffect(() => {
    setDataSource(handleData());
    return () => {
      materiasPrimas.refetch(); //  To update materiasPrimas and re-render when navigating through components
    };
  }, [materiasPrimas.status]);

  const [formCompleted, setFormCompleted] = useState(false);
  const [tableShouldUpdate, setTableShouldUpdate] = useState(false);

  useEffect(() => {
    if (formCompleted) {
      updateTableData();
      setFormCompleted(false);
      setTableShouldUpdate(false);
    }
  }, [formCompleted]);

  const updateTableData = async () => {
    const response = await getMateriasPrimas("materiaprima");
    setDataSource(mapData(response));
    setTableShouldUpdate(true);
  };

  return (
    <div>
      <ModalForm
        inputs={{
          string: [{ name: 1 }, { type: 1 }],
          number: [{ amount: 1 }, { size: 1 }],
        }}
        route={"materiaPrima"}
        setFormCompleted={setFormCompleted}
      />
      <p></p>
      {dataSource?.length ? (
        <CustomTable
          dataColumns={columns}
          originData={dataSource}
          updateRoute="materiaprima"
          deleteRoute="materiaPrima"
          tableShouldUpdate={tableShouldUpdate}
        />
      ) : (
        <div>Cargando</div>
      )}
    </div>
  );
};

export default MateriasPrimas;
