import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const Search = ({ onSearch, searchTerm, setSearchTerm }) => {
  return (
    <Container className="mt-4">
      <Form onSubmit={onSearch}>
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8}>
            <div className="d-flex gap-2">
              <Form.Control
                placeholder="Search for new image..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="primary" type="submit">
                Search
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default Search;
