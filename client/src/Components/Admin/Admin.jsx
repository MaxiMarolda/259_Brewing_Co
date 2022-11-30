import React, { useState } from "react";
import "./Admin.css";
import Barriles from "./ABM/Barriles";
import Fermentadores from "./ABM/Fermentadores";
import MateriasPrimas from "./ABM/MateriasPrimas";
import Productos from "./ABM/Productos";
import Recetas from "./ABM/Recetas";
import Usuarios from "./ABM/Usuarios";
import CustomTable from "../assets/CustomTable";
import AdminBackup from "./AdminBackup";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  //UploadOutlined,
  UserOutlined,
  //VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";

const App = () => {
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const components = [
    <Barriles />,
    <Fermentadores />,
    <MateriasPrimas />,
    <Productos />,
    <Recetas />,
    <Usuarios />,
    <CustomTable />,
    <AdminBackup />,
  ];
  const [activeComponent, setActiveComponent] = useState(0); //  = defaultSelectedKeys

  const renderComponent = (e) => {
    setActiveComponent(e.key);
  };

  return (
    <Layout
      hasSider
      style={{
        minHeight: "100vh",
        maxHeight: "100vh",
      }}
    >
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["0"]}
          items={components.map((component, index) => {
            return { key: index, icon: <UserOutlined />, label: component.type.name };
          })}
          onClick={(e) => renderComponent(e)}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: "trigger",
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            height: "100%",
          }}
        >
          {components[activeComponent]}
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;
