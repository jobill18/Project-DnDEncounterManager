import React, { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";

function DEHealthTracker({ maxHp, monster }) {
  const [hp, setHp] = useState(maxHp);
  const [value, setValue] = useState(null);
  const [dead, setDead] = useState(false);

  const increase = () => {
    if (hp === maxHp) {
      alert(`${monster} is already at full health!`);
    } else if (hp + value >= maxHp) {
      setHp(maxHp);
    } else {
      setHp(hp + value);
    }
  };

  const decrease = () => {
    setHp(hp - value);
    checkDead();
  };

  const checkDead = () => {
    if (hp - value <= 0) {
      setHp(0);
      setDead(true);
    }
  };

  const reset = () => {
    setHp(maxHp);
    setDead(false);
  };

  const currentHp = `Current Hit Points: ${hp}`;
  const deathMessage = `${monster} is dead!`;

  const onChange = (e) => {
    setValue(+e.target.value);
  };

  return !dead ? (
    <>
      <Col xs="2">
        <Button onClick={reset}>Reset HP</Button>
      </Col>
      <Col className="fw-bold">{currentHp}</Col>
      <Col>
        <Form.Control type="number" value={+value} onChange={onChange} />
      </Col>
      <Col>
        <Button onClick={increase}>Heal</Button>
        <Button onClick={decrease}>Damage</Button>
      </Col>
    </>
  ) : (
    <>
      <Col xs="2">
        <Button onClick={reset}>Reset HP</Button>
      </Col>
      <Col className="fw-bold">{deathMessage}</Col>
    </>
  );
}

export default DEHealthTracker;
