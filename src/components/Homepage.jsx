import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Homepage() {
  return (
    <Container fluid>
      <Row>
        <Col>
          <h3>Welcome!</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>
            This is the D&D Encounter Manager, a tool for dungeon masters to
            plan their encounters ahead of time and view the most important
            information about the creatures involved. There are a few encounters
            that have been premade and by creating an account, you can create
            your own encounters and choose which monsters to include. Happy
            adventuring!
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default Homepage;
