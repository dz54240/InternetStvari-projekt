import { Table, Button, Space } from "antd";
import { useNavigate } from "react-router-dom";

const GreenhouseTable = ({ greenhouses, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const columns = [
    {
      title: "Naziv",
      dataIndex: ["attributes", "name"],
      key: "name",
    },
    {
      title: "Zadnja temperatura (°C)",
      dataIndex: ["attributes", "last_temperature_measurement"],
      key: "temperature",
      render: (temp) => temp?.value ?? "N/A",
      align: "center",
    },
    {
      title: "Zadnja vlažnost (%)",
      dataIndex: ["attributes", "last_moisture_measurement"],
      key: "moisture",
      render: (moisture) => moisture?.value ?? "N/A",
      align: "center",
    },
    {
      title: "Akcije",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            onClick={() => navigate(`/greenhouses/${record.id}`)}
          >
            Otvori
          </Button>
          <Button onClick={() => onEdit(record)}>Uredi</Button>
          <Button danger onClick={() => onDelete(record.id)}>
            Izbriši
          </Button>
        </Space>
      ),
    },
  ];

  return <Table rowKey="id" dataSource={greenhouses} columns={columns} pagination={false} />;
};

export default GreenhouseTable;
