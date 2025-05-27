import { Modal, Input, Form } from "antd";
import { useState, useEffect } from "react";

const GreenhouseModal = ({ isOpen, onClose, onSave, editingGreenhouse }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (editingGreenhouse) {
      setName(editingGreenhouse.attributes.name);
    } else {
      setName("");
    }
  }, [editingGreenhouse]);

  const handleOk = () => {
    onSave(name);
    setName("");
  };

  return (
    <Modal
      title={editingGreenhouse ? "Uredi staklenik" : "Dodaj staklenik"}
      open={isOpen}
      onCancel={onClose}
      onOk={handleOk}
      okText={editingGreenhouse ? "Spremi promjene" : "Dodaj staklenik"}
    >
      <Form layout="vertical">
        <Form.Item label="Name">
          <Input
            placeholder="Unesite naziv staklenika"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default GreenhouseModal;
