import React, { useEffect, useState } from "react";
import { SmileOutlined } from "@ant-design/icons";
import { notification } from "antd";
import { useQuery } from "react-query";

const Notification = ({ title, message, data, requestOptions }) => {
  const [api, contextHolder] = notification.useNotification();
  //body: JSON.stringify({data}),
  const [newMateriaPrima, setNewMateriaPrima] = useState(false);
  const [updatedMateriaPrima, setUpdatedMateriaPrima] = useState(false);

  const query = async (route) => {
    console.log("query", requestOptions);
    const response = await fetch("http://localhost:3001/" + route, requestOptions);
    return response.json();
  };

  useEffect(() => {
    try {
      if (newMateriaPrima) {
        console.log("1");
        const { data, status } = useQuery("materiasPrimas", () => query("materiaprima"));
        console.log("DATA ", data);
        setUpdatedMateriaPrima(data);
        console.log(updatedMateriaPrima.status);
        console.log(updatedMateriaPrima.data);
        console.log("2");
        setNewMateriaPrima(false);
      }
    } catch (error) {
      console.log("ERROR:", error.message);
    }
  }, [newMateriaPrima]);

  const openNotification = () => {
    console.log("A");
    setNewMateriaPrima(true);

    console.log("B");
    if (updatedMateriaPrima) {
      api.open({
        message: title,
        description: message,
        icon: (
          <SmileOutlined
            style={{
              color: "#108ee9",
            }}
          />
        ),
      });
    } else {
      api.open({
        message: "NOOOOOOOOOOOOOOOOOO",
        description: message,
        icon: (
          <SmileOutlined
            style={{
              color: "#108ee9",
            }}
          />
        ),
      });
    }
  };

  return (
    <>
      {contextHolder}
      <a onClick={openNotification}>Save</a>
    </>
  );
};
export default Notification;
