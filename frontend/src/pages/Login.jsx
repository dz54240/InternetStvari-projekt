import { useState } from "react";
import { Layout, Button, Input, Typography, Form, message, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { fetchApi, saveToken, saveUser } from "../utils/api";

const { Content } = Layout;
const { Title, Text } = Typography;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetchApi("/sessions", "POST", {
        data: { email, password },
      });
      const { token, user } = response.data;
      saveToken(token);
      saveUser(user);
      message.success("Login successful");
      navigate("/home");
    } catch (error) {
      message.error("Login failed. Check your credentials.");
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Card style={{ width: 350 }}>
          <Form onFinish={handleLogin} layout="vertical">
            <Title level={3} style={{ textAlign: "center" }}>Prijavi se</Title>
            <Form.Item name="email" rules={[{ required: true, message: "Unesite svoju email adresu" }]}> 
              <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: "Unesite svoju lozinku" }]}> 
              <Input.Password placeholder="Lozinka" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Prijavi se
              </Button>
            </Form.Item>
            <Text >Nemate račun? <a onClick={() => navigate("/register")}>Registriraj se</a></Text>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
};