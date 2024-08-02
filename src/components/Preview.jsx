import axios from "axios";
import React, { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";

function Preview() {
  const user = useSelector((state) => state.user);
  const { encounters } = useLoaderData();
  const [displayEnc, setDisplayEnc] = useState(encounters);
  const [isLoading, setIsLoading] = useState(false);

  console.log(user);

  const encounterCards = displayEnc.map((encounter) => (
    <Row key={encounter.encounterId}>
      <Col xs="8">
        <h3>{encounter.encounterName}</h3>
      </Col>
      <Col>
        <Link to={`/encounters/${encounter.encounterId}`}>View Details</Link>
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
        <Row>
          <Col xs="8">
            <h1>Encounters</h1>
          </Col>
          <Col xs="4">
            <button type="sumbit" onClick={addEncounter}>
              Add Encounter
            </button>
          </Col>
        </Row>
        {encounterCards}
      </Container>
    ) : (
      <h3>Loading Encounters...</h3>
    )
  ) : (
    <Container fluid>
      <Row>
        <Col xs="8">
          <h1>Encounters</h1>
        </Col>
      </Row>
      {encounterCards}
    </Container>
  );
}

export default Preview;
