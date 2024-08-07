import axios from "axios";
import React from "react";
import DERemoveMonsterButton from "./DERemoveMonsterButton";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

function DEMonsterTable({ monster, isEditing, setMonsterList, monsterList }) {
  const [details, setDetails] = useState(null);
  const { monsterName, monsterId, encounterId } = monster;
  const [isLoading, setIsLoading] = useState(false);

  const removeMonster = async () => {
    setIsLoading(true);
    axios
      .delete(`/api/encounters/${encounterId}/${monsterId}/delete`)
      .then(() => {
        const newMonsterListCopy = [...monsterList];
        const newMonsterList = newMonsterListCopy.filter((monsterEntry) => {
          return monsterEntry.monsterId !== +monsterId;
        });
        setMonsterList(newMonsterList);
        alert(`${monsterName} has been removed from the encounter.`);
      });
    setIsLoading(false);
  };

  useEffect(() => {
    monsterDetails();
  }, []);

  function monsterDetails() {
    axios.get(monster.monsterUrl).then((res) => {
      setDetails(res.data);
    });
  }

  return (
    details &&
    (!isLoading ? (
      <Container fluid key={monster.monsterId}>
        <Row className="px-3 py-2">
          <Col>
            <h3>{monster.monsterName}</h3>
          </Col>
          <Col className="fw-bold text-end">CR: </Col>
          <Col>{details.challenge_rating}</Col>
        </Row>
        <Row className="px-3 py-1">
          {/* <Col xs="3"></Col> */}
          <Col xs="1" className="fw-bold text-end">
            AC:
          </Col>
          <Col xs="1">{details.armor_class[0].value}</Col>
          <Col xs="1" className="fw-bold text-end">
            HP:
          </Col>
          <Col xs="1">{details.hit_points}</Col>
          <Col xs="1" className="fw-bold text-end">
            Speed:
          </Col>
          <Col xs="1">{details.speed.walk}</Col>
        </Row>
        <Row className="px-3 py-1 fw-bold text-center">
          {/* <Col xs="3"></Col> */}
          <Col xs="1">STR</Col>
          <Col xs="1">DEX</Col>
          <Col xs="1">CON</Col>
          <Col xs="1">INT</Col>
          <Col xs="1">WIS</Col>
          <Col xs="1">CHA</Col>
        </Row>
        <Row className="px-3 py-1 text-center">
          {/* <Col xs="3"></Col> */}
          <Col xs="1">{details.strength}</Col>
          <Col xs="1">{details.dexterity}</Col>
          <Col xs="1">{details.constitution}</Col>
          <Col xs="1">{details.intelligence}</Col>
          <Col xs="1">{details.wisdom}</Col>
          <Col xs="1">{details.charisma}</Col>
        </Row>
        <Row className="px-3 py-1 fw-bold">
          <Col>Features:</Col>
        </Row>
        {details.special_abilities.map((feature) => (
          <Row key={feature.name} className="px-3 py-1">
            <Col>
              {feature.name}: {feature.desc}
            </Col>
          </Row>
        ))}
        <Row className="px-3 py-1 fw-bold">
          <Col>Actions:</Col>
        </Row>
        {details.actions.map((action) => (
          <Row key={action.name} className="px-3 py-1">
            <Col>
              {action.name}: {action.desc}
            </Col>
          </Row>
        ))}
        <Row className="px-3 py-1">
          <Col xs="10" className="text-center">
            <DERemoveMonsterButton
              isEditing={isEditing}
              removeMonster={removeMonster}
              monsterId={monsterId}
            />
          </Col>
        </Row>
      </Container>
    ) : (
      <h3>Removing Monster...</h3>
    ))
  );
}

export default DEMonsterTable;
