import { useState } from "react";
import { Layout, Button, Input, Typography, Form, message, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { fetchApi } from "../utils/api";

const { Content } = Layout;
const { Title, Text } = Typography;

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await fetchApi("/users", "POST", {
        data: {
          first_name: firstName,
          last_name: lastName,
          email,
          password,
        },
      });
      message.success("Registration successful. Please login.");
      navigate("/");
    } catch (error) {
      message.error("Registration failed. Please try again.");
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Card style={{ width: 350 }}>
          <Form onFinish={handleRegister} layout="vertical">
            <Title level={3} style={{ textAlign: "center" }}>Registriraj se</Title>
            <Form.Item name="firstName" rules={[{ required: true, message: "Unesite svoje ime" }]}> 
              <Input placeholder="Ime" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </Form.Item>
            <Form.Item name="lastName" rules={[{ required: true, message: "Unesite svoje prezime" }]}> 
              <Input placeholder="Prezime" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </Form.Item>
            <Form.Item name="email" rules={[{ required: true, message: "Unesite svoju email adresu" }]}> 
              <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: "Unesite svoju lozinku" }]}> 
              <Input.Password placeholder="Lozinka" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Registriraj se
              </Button>
            </Form.Item>
            <Text >Već imate račun? <a onClick={() => navigate("/")}>Prijavi se</a></Text>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
};