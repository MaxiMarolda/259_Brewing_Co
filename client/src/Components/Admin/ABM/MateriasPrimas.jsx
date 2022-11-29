import React, { useContext, useEffect, useRef, useState } from "react";
//import "./index.css";
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

const MateriasPrimas = () => {
  const getRecetas = async (route) => {
    const response = await fetch("http://localhost:3001/" + route);
    return response.json();
  };

  let materiasPrimas = useQuery("materiasPrimas", () => getRecetas("materiaprima"), {
    //refetchOnWindowFocus: true,
  });

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
      materiasPrimas.refetch(); //  To update materiasPrimas and re-render when navigating through component
    };
  }, [materiasPrimas.status]);

  const [count, setCount] = useState(2);
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };
  const defaultColumns = [
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
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <div>
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
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
            title="Materia Prima"
            successMessage="Materia prima guardada con éxito"
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
      name: `Nombre`,
      type: "Tipo",
      amount: "Cantidad",
      size: "0",
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
export default MateriasPrimas;
