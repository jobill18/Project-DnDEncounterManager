import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { Container, Row, Col, Button, Nav } from "react-bootstrap";

function Preview() {
  const { encounters } = useLoaderData();
  const [displayEnc, setDisplayEnc] = useState(encounters);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser();
  });

  const getUser = async () => {
    if (!user) {
      const res = await axios.get("/api/auth");
      setUser(res.data.user);
    }
  };

  const encounterCards = displayEnc.map((encounter) => (
    <Row key={encounter.encounterId} className="px-3 py-1">
      <Col>
        <h3>{encounter.encounterName}</h3>
      </Col>
      <Col className="text-center">
        <Button>
          <Nav.Link as={Link} to={`/encounters/${encounter.encounterId}`}>
            View Details
          </Nav.Link>
        </Button>
      </Col>
    </Row>
  ));

  const addEncounter = async () => {
    setIsLoading(true);
    const { data } = await axios.post("/api/encounters", {
      encounterName: "New Encounter",
    });
    console.log(data);
    setDisplayEnc([...displayEnc, data]);
    setIsLoading(false);
  };

  return user ? (
    !isLoading ? (
      <Container fluid>
        <Row className="p-3">
          <Col>
            <h1>Encounters</h1>
          </Col>
          <Col className="text-center">
            <Button type="sumbit" onClick={addEncounter}>
              Add Encounter
            </Button>
          </Col>
        </Row>
        {encounterCards}
      </Container>
    ) : (
      <h3>Loading Encounters...</h3>
    )
  ) : (
    <Container fluid>
      <Row className="p-3">
        <Col>
          <h1>Encounters</h1>
        </Col>
      </Row>
      {encounterCards}
    </Container>
  );
}

export default Preview;
