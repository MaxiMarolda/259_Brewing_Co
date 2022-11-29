import React from "react";
import { Progress, Space } from 'antd';

const Fermentadores = () => {
  return (
    <div>
      <p> ESTAS EN Fermentadores</p>
      <Space wrap>
        <Progress type="circle" percent={75} />
        <Progress type="circle" percent={70} status="exception" />
        <Progress type="circle" percent={100} />
        <Progress type="circle" percent={100} status="normal"/>
      </Space>
    </div>
  );
};

export default Fermentadores;
