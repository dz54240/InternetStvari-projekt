import { Layout, Button, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import { fetchApi, getToken } from "../utils/api";
import { useEffect, useState } from "react";

const { Header } = Layout;
const { Title, Text } = Typography;

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData).attributes);
      } catch {
        setUser(null);
      }
    }
  }, []);

  const handleLogout = async () => {
    try {
      const token = getToken();
      if (token) {
        await fetchApi("/sessions", "DELETE", null, {
          Authorization: `Bearer ${token}`,
        });
      }

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      message.success("Odjavljeni ste.");
      navigate("/");
    } catch (error) {
      message.error("Neuspješna odjava. Pokušajte ponovno.");
    }
  };

  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#f0f2f5",
        padding: "0 24px",
      }}
    >
      <Title level={3} style={{ margin: 0, cursor: "pointer" }} onClick={() => navigate("/home")}>
        Plantelligence
      </Title>

      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {user && (
          <Text>
            Prijavljeni ste kao: <strong>{user.first_name} {user.last_name}</strong>
          </Text>
        )}
        <Button danger onClick={handleLogout}>
          Odjava
        </Button>
      </div>
    </Header>
  );
};

export default Navbar;
