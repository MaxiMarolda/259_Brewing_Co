import React from "react";
import { Button, Form, Input, InputNumber } from "antd";
//import { useHistory } from "react-router";

/* inputs structure:

inputs = {
  type1: [{ input1: (1 if required 0 if not) }, { input2: 1 or 0 }],
  type2: [{ input3: 1 or 0 }, { input4: 1 or 0 }],
}

ex:
inputs = {
  string: [{ name: 1 }, { type: 0 }],
  number: [{ amount: 0 }, { size: 1 }],
}
*/

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const CustomForm = ({ inputs, route, setIsFormFinished }) => {
  const onFinish = async (values) => {
    try {
      const response = await fetch(`http://localhost:3001/${route}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values.user),
      });

      setIsFormFinished(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  const createInputs = () => {
    const formItems = [];
    let index = 0;
    for (let input in inputs) {
      inputs[input].map((prop) => {
        formItems.push(
          <Form.Item
            key={index++}
            name={["user", Object.keys(prop).join()]}
            label={Object.keys(prop).join()}
            rules={[
              {
                type: input,
                required: Number(Object.values(prop).join()),
              },
            ]}
          >
            {input === "string" ? <Input /> : <InputNumber />}
          </Form.Item>
        );
      });
    }
    return formItems.map((formItem) => formItem);
  };

  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      {createInputs()}

      <Form.Item
        wrapperCol={{
          ...layout.wrapperCol,
          offset: 8,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default CustomForm;
