import React, { useState, useEffect } from "react";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import { notification } from "antd";

const Notification = ({ title, successMessage, errorMessage, requestOptions, id }) => {
  const [api, contextHolder] = notification.useNotification();
  const query = async (route) => {
    const response = await fetch(`http://localhost:3001/materiaprima/${id}`, requestOptions);
    return response.json();
  };

  const openNotification = async () => {
    try {
      const response = await query();
      if (response._id) {
        api.open({
          message: title,
          description: successMessage,
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
          message: title,
          description: errorMessage,
          icon: (
            <FrownOutlined
              style={{
                color: "#108ee9",
              }}
            />
          ),
        });
      }
    } catch (error) {
      console.log(error.message);
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
