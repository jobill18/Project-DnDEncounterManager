import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import logo from "../assets/logo-red.png";

function Homepage() {
  return (
    <Container fluid>
      <Row className="p-3 text-center">
        <Col>
          <h1>Welcome!</h1>
        </Col>
      </Row>
      <Row className="p-3">
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
      <Row>
        <Col className="text-center">
          <Image
            src={logo}
            alt="Encounter Manager logo"
            roundedCircle
            className="w-75"
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Homepage;
