import { useQuery } from "@tanstack/react-query";
import { listPrices, Price } from "../../services/prices-service";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useState } from "react";
import NewPriceModal from "./new-price-modal";

export const Prices = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["prices"],
    queryFn: listPrices,
  });

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <Container fluid>
      <NewPriceModal show={showModal} handleClose={handleClose} />
      <Row className="mb-3">
        <Col className="d-flex justify-content-end align-items-center">
          <Button variant="primary" onClick={handleShow}>
            Novo Preço
          </Button>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          {isLoading && <p>Carregando...</p>}
          {error && <p>Erro ao carregar os preços.</p>}
          {data && data.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Valor</th>
                  <th>Descrição</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                {data.map((price: Price) => (
                  <tr key={price.measure}>
                    <td>{price.product}</td>
                    <td>{price.measure}</td>
                    <td>{price.size}</td>
                    <td>{price.price}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            !isLoading && !error && <p>Nenhum preço encontrado.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Prices;