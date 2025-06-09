import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Layout,
  Typography,
  Card,
  Spin,
  Button,
  message,
  Tag,
  Descriptions,
} from "antd";
import Navbar from "../components/Navbar";
import { fetchApi, getToken } from "../utils/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const { Content } = Layout;
const { Title } = Typography;

const GreenhouseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [greenhouse, setGreenhouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [temperatureData, setTemperatureData] = useState([]);
  const [moistureData, setMoistureData] = useState([]);

  useEffect(() => {
    const fetchGreenhouse = async () => {
      try {
        const token = getToken();
        const response = await fetchApi(`/greenhouses/${id}`, "GET", null, {
          Authorization: `Bearer ${token}`,
        });
        setGreenhouse(response.data);

        const tempResponse = await fetchApi(
          `/temperature_measurements?greenhouse_id=${id}`,
          "GET",
          null,
          {
            Authorization: `Bearer ${token}`,
          }
        );

        const moistResponse = await fetchApi(
          `/moisture_measurements?greenhouse_id=${id}`,
          "GET",
          null,
          {
            Authorization: `Bearer ${token}`,
          }
        );

        const formatData = (data) =>
          data.map((item) => ({
            value: item.attributes.value,
            time: new Date(item.attributes.created_at).toLocaleString(),
          }));

        setTemperatureData(formatData(tempResponse.data));
        setMoistureData(formatData(moistResponse.data));
      } catch (error) {
        message.error("Greška pri dohvaćanju podataka o plasteniku.");
      } finally {
        setLoading(false);
      }
    };

    fetchGreenhouse();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <Navbar />
        <Content style={{ padding: "40px", textAlign: "center", backgroundColor: "#fff" }}>
          <Spin size="large" />
        </Content>
      </Layout>
    );
  }

  if (!greenhouse) {
    return (
      <Layout>
        <Navbar />
        <Content style={{ padding: "40px", textAlign: "center", backgroundColor: "#fff" }}>
          <Typography.Text>Plastenik nije pronađen.</Typography.Text>
        </Content>
      </Layout>
    );
  }

  const attr = greenhouse.attributes;

  const renderTag = (val) =>
    val ? <Tag color="green">DA</Tag> : <Tag color="red">NE</Tag>;

  return (
    <Layout>
      <Navbar />
      <Content style={{ padding: "40px", backgroundColor: "#fff", minHeight: "100vh" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <Title level={2}>Detalji plastenika</Title>
          <Card bordered style={{ marginBottom: "24px" }}>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Naziv">{attr.name}</Descriptions.Item>
              <Descriptions.Item label="Navodnjavanje">
                {renderTag(attr.irrigation)}
              </Descriptions.Item>
              <Descriptions.Item label="Rasvjeta">
                {renderTag(attr.lighting)}
              </Descriptions.Item>
              <Descriptions.Item label="Prozori otvoreni">
                {renderTag(attr.windows)}
              </Descriptions.Item>
              <Descriptions.Item label="Kut otvorenosti prozora">
                {attr.window_open_percentage ? `${attr.window_open_percentage}°` : "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Kreiran">
                {new Date(attr.created_at).toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item label="Zadnje ažuriranje">
                {new Date(attr.updated_at).toLocaleString()}
              </Descriptions.Item>
            </Descriptions>
          </Card>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "16px",
                flexWrap: "wrap",
                justifyContent: "center",
                maxWidth: "800px",
              }}
            >
              <Card style={{ flex: 1, minWidth: "300px" }} bordered>
                <Typography.Text strong>Zadnja izmjerena temperatura</Typography.Text>
                <div style={{ marginTop: "12px" }}>
                  <Typography.Title level={3} style={{ margin: 0 }}>
                    {attr.last_temperature_measurement?.value ?? "N/A"} °C
                  </Typography.Title>
                  <Typography.Text type="secondary">
                    {attr.last_temperature_measurement
                      ? `Vrijeme: ${new Date(
                          attr.last_temperature_measurement.created_at
                        ).toLocaleString()}`
                      : "Nema podataka"}
                  </Typography.Text>
                </div>
              </Card>
              <Card style={{ flex: 1, minWidth: "300px" }} bordered>
                <Typography.Text strong>Zadnja izmjerena vlažnost</Typography.Text>
                <div style={{ marginTop: "12px" }}>
                  <Typography.Title level={3} style={{ margin: 0 }}>
                    {attr.last_moisture_measurement?.value ?? "N/A"} %
                  </Typography.Title>
                  <Typography.Text type="secondary">
                    {attr.last_moisture_measurement
                      ? `Vrijeme: ${new Date(
                          attr.last_moisture_measurement.created_at
                        ).toLocaleString()}`
                      : "Nema podataka"}
                  </Typography.Text>
                </div>
              </Card>
            </div>
          </div>
          <div style={{ marginTop: "40px" }}>
            <Title level={4} style={{ textAlign: "center", marginBottom: "16px" }}>
              Povijest mjerenja temperature
            </Title>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={temperatureData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                <YAxis unit="°C" />
                <Tooltip formatter={(value) => `${value} °C`} />
                <Line type="monotone" dataKey="value" stroke="#ff4d4f" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div style={{ marginTop: "40px" }}>
            <Title level={4} style={{ textAlign: "center", marginBottom: "16px" }}>
              Povijest mjerenja vlažnosti
            </Title>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={moistureData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                <YAxis unit="%" />
                <Tooltip formatter={(value) => `${value} %`} />
                <Area type="monotone" dataKey="value" stroke="#1890ff" fill="#e6f7ff" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default GreenhouseDetails;
