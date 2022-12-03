import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import CustomTable from "../../assets/CustomTable";
import ModalForm from "../../assets/ModalForm";

const Barriles = () => {
  const getBarriles = async (route) => {
    const response = await fetch("http://localhost:3001/" + route);
    return response.json();
  };

  let barriles = useQuery("barriles", () => getBarriles("barril"), {
    refetchOnWindowFocus: true,
  });

  const dataColumns = [
    {
      title: "id",
      dataIndex: "_id",
      width: "20%",
      editable: false,
    },
    {
      title: "tipo",
      dataIndex: "type",
      width: "10%",
      editable: true,
    },
    {
      title: "Cliente",
      dataIndex: "clientId",
      width: "15%",
      editable: true,
    },
    {
      title: "Fecha salida",
      dataIndex: "dateLeft",
      editable: false,
    },
    {
      title: "Fecha retorno",
      dataIndex: "dateReturn",
      editable: false,
    },
    {
      title: "Activo",
      dataIndex: "isActive",
      editable: false,
    },
  ];
  
  const [dataSource, setDataSource] = useState([]);

  const mapData = (data) => {
    return data.map( barril => {
      return {
        key: barril._id,
        _id: barril._id,
        clientId: barril.clientId,
        type: barril.type,
        dateLeft: barril.dateLeft,
        dateReturn: barril.dateReturn,
        isActive: barril.isActive,
      };
    });
  };

  const handleData = () => {
    if (barriles?.status === "success") {
      const data = mapData(barriles.data);
      return data;
    }
  };

  useEffect(() => {
    setDataSource(handleData());
    return () => {
      barriles.refetch(); //  To update barriles and re-render when navigating through component
    };
  }, [barriles.status]);

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
    const response = await getBarriles("barril");
    setDataSource(mapData(response));
    setTableShouldUpdate(true);
  };


  return (
    <div>
      <ModalForm
        inputs={{
          string: [{ tipo: 1 }],
        }}
        route={"barril"}
        setFormCompleted={setFormCompleted}
        method="POST"
        title="Crear un nuevo Barril"
      />
      <p></p>
      {dataSource?.length  
      ? <CustomTable 
          dataColumns={dataColumns} 
          originData={dataSource} 
          /> 
      : <div>Cargando</div>}
    </div>
  );
};

export default Barriles;
