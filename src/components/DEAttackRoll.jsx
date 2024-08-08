import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";

function DEAttackRoll({ bonus, keyName }) {
  const [result, setResult] = useState(null);
  const attackRoll = () => {
    const num = Math.ceil(Math.random() * 20);
    if (num === 1) {
      setResult("Natural 1, Critical Fail!");
    } else if (num === 20) {
      setResult("Natural 20. Critical Success!");
    } else {
      setResult(num + bonus);
    }
  };
  const clear = () => setResult(null);

  return bonus ? (
    result ? (
      <>
        <Row className="px-3">
          <Col>
            <Button onClick={clear}>Clear Result</Button>
          </Col>
        </Row>
        <Row className="px-3">
          <Col xs="10" className="fw-bold">
            Result: {result}
          </Col>
        </Row>
      </>
    ) : (
      <Row className="px-3">
        <Col>
          <Button onClick={attackRoll}>Roll to Hit!</Button>
        </Col>
      </Row>
    )
  ) : (
    <></>
  );
}

export default DEAttackRoll;
