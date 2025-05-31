import { Card, Col, Container, Row, Stack } from "react-bootstrap";
import { BarChart, Bar, ResponsiveContainer } from "recharts";
import { Tree, TreeData } from "../../components/tree/tree";

const data = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
];

const treeData: TreeData = {
  data: [
    {
      key: "1",
      label: "Comunidade Cartoes",
      children: [
        {
          key: "1-1",
          label: "Tron",
          children: [
            {
              key: "1-1-1",
              label: "4000 consulta de pedidos - custo R$ 3000,00",
            },
            {
              key: "1-1-2",
              label: "2000000 eventos processados - custo R$ 2000,00",
            },
          ],
        },
        {
          key: "1-2",
          label: "Gerenciador de Entregas",
          children: [
            {
              key: "1-2-1",
              label: "500 entregas com sucesso - custo R$ 1000,00",
            },
            {
              key: "1-2-2",
              label: "39999 consultas de entrega - custo R$ 500,00",
            },
          ],
        },
      ],
    },
    {
      key: "2",
      label: "Comunidade Agro PF",
      children: [
        {
          key: "1-1",
          label: "Tron",
          children: [
            {
              key: "1-1-1",
              label: "4000 consulta de pedidos - custo R$ 3000,00",
            },
            {
              key: "1-1-2",
              label: "2000000 eventos processados - custo R$ 2000,00",
            },
          ],
        },
      ],
    },
  ],
};

export const Home = () => {
  return (
    <Stack gap={2}>
      <Container fluid>
        <Row>
          <Col>
            <Card>
              <Card.Header>Custo por Organização</Card.Header>
              <Card.Body>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data}>
                    <Bar dataKey="uv" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <Row>
          <Col>
            <Card>
              <Card.Header>Detalhamento de Custos</Card.Header>
              <Card.Body>
                <Tree data={treeData.data} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Stack>
  );
};