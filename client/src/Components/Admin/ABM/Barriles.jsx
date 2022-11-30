import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import CustomTable from "../../assets/CustomTable";

const Barriles = () => {
  const getBarriles = async (route) => {
    const response = await fetch("http://localhost:3001/" + route);
    return response.json();
  };

  let barriles = useQuery("barriles", () => getBarriles("barril"), {
    //refetchOnWindowFocus: true,
  });

  const [dataSource, setDataSource] = useState([]);

  const handleData = () => {
    let data = [];
    if (barriles?.status === "success") {
      data = barriles.data?.map((barril) => {
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
    }
    return data;
  };

  useEffect(() => {
    setDataSource(handleData());
    return () => {
      barriles.refetch(); //  To update barriles and re-render when navigating through component
    };
  }, [barriles.status]);

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

  return (
    <div>
      {dataSource.length ? <CustomTable dataColumns={dataColumns} originData={dataSource} /> : <div>Cargando</div>}
    </div>
  );
};
export default Barriles;
