import { useState, useEffect } from "react";
import { Layout, Button, Input, Typography, Space } from "antd";
import Navbar from "../components/Navbar";
import GreenhouseTable from "../components/GreenhouseTable";
import GreenhouseModal from "../components/GreenhouseModal";
import { fetchApi, getToken } from "../utils/api";

const { Content } = Layout;
const { Title } = Typography;

export default function Home() {
  const [greenhouses, setGreenhouses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGreenhouse, setEditingGreenhouse] = useState(null);

  useEffect(() => {
    fetchGreenhouses();
  }, []);

  const fetchGreenhouses = async () => {
    try {
      const token = getToken();
      const response = await fetchApi("/greenhouses", "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setGreenhouses(response.data);
    } catch (error) {
      console.error("Error fetching greenhouses:", error);
    }
  };

  const handleOpenModal = (greenhouse = null) => {
    setEditingGreenhouse(greenhouse);
    setIsModalOpen(true);
  };

  const handleSaveGreenhouse = async (name) => {
    const token = getToken();
    try {
      if (editingGreenhouse) {
        await fetchApi(
          `/greenhouses/${editingGreenhouse.id}`,
          "PATCH",
          {
            data: { name },
          },
          {
            Authorization: `Bearer ${token}`,
          }
        );
        setGreenhouses(
          greenhouses.map((gh) =>
            gh.id === editingGreenhouse.id
              ? { ...gh, attributes: { ...gh.attributes, name } }
              : gh
          )
        );
      } else {
        const response = await fetchApi(
          "/greenhouses",
          "POST",
          {
            data: { name },
          },
          {
            Authorization: `Bearer ${token}`,
          }
        );
        setGreenhouses([...greenhouses, response.data]);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving greenhouse:", error);
    }
  };

  const handleDeleteGreenhouse = async (id) => {
    try {
      const token = getToken();
      await fetchApi(`/greenhouses/${id}`, "DELETE", null, {
        Authorization: `Bearer ${token}`,
      });
      setGreenhouses(greenhouses.filter((gh) => gh.id !== id));
    } catch (error) {
      console.error("Error deleting greenhouse:", error);
    }
  };

  const filteredGreenhouses = greenhouses.filter((gh) =>
    gh.attributes.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <Navbar />
      <Content style={{ padding: "40px", backgroundColor: "#fff" }}>
  <div
    style={{
      maxWidth: "1000px",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: "24px",
    }}
  >
    <Title level={2} style={{ textAlign: "center" }}>
      Plastenici
    </Title>

    <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
      <Input
        placeholder="Pretraži plastenike..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ width: "250px" }}
      />
      <Button
        type="primary"
        onClick={() => handleOpenModal()}
        style={{ width: "130px" }}
      >
        Dodaj plastenik
      </Button>
    </div>

    <GreenhouseTable
      greenhouses={filteredGreenhouses}
      onEdit={handleOpenModal}
      onDelete={handleDeleteGreenhouse}
    />
  </div>
</Content>

      <GreenhouseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveGreenhouse}
        editingGreenhouse={editingGreenhouse}
      />
    </Layout>
  );
}
