import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import CustomForm from "./CustomForm";

const ModalForm = ({ inputs, route }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormFinished, setIsFormFinished] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isFormFinished) {
      handleOk();
    }
  }, [isFormFinished]);

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal title="Crear materia prima" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <CustomForm inputs={inputs} route={route} setIsFormFinished={setIsFormFinished} />
      </Modal>
    </>
  );
};
export default ModalForm;
