import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Form, Input, Popconfirm, Table } from "antd";
import { useQuery } from "react-query";
import Notification from "./Notification";

const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({ title, editable, children, dataIndex, record, handleSave, ...restProps }) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

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

  const [count, setCount] = useState(2);
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };
  const defaultColumns = [
    {
      title: "id",
      dataIndex: "_id",
      width: "30%",
      editable: false,
    },
    {
      title: "tipo",
      dataIndex: "type",
      editable: true,
    },
    {
      title: "Cliente",
      dataIndex: "clientId",
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
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <div>
            <Popconfirm title="Seguro de querer borrar?" onConfirm={() => handleDelete(record.key)}>
              <a>Delete</a>
            </Popconfirm>{" "}
          </div>
        ) : null,
    },
    {
      title: "operation2",
      dataIndex: "operation2",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Notification
            title="Barriles"
            successMessage="Nuevo Barril guardado con éxito"
            errorMessage="Error al guardar información"
            id={record._id}
            requestOptions={{
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(record),
            }}
          />
        ) : null,
    },
  ];

  const handleAdd = () => {
    const newData = {
      key: count,
      type: "Tipo",
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <div>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Add a row
      </Button>
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns}
      />
    </div>
  );
};
export default Barriles;
