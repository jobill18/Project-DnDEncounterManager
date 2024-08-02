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
      <Container key={monster.monsterId}>
        <Row>
          <Col>
            <h3>{monster.monsterName}</h3>
          </Col>
          <Col>CR: {details.challenge_rating}</Col>
        </Row>
        <Row>
          <Col>AC: {details.armor_class[0].value}</Col>
          <Col>HP: {details.hit_points}</Col>
          <Col>Speed: {details.speed.walk}</Col>
        </Row>
        <Row>
          <Col>STR</Col>
          <Col>DEX</Col>
          <Col>CON</Col>
          <Col>INT</Col>
          <Col>WIS</Col>
          <Col>CHA</Col>
        </Row>
        <Row>
          <Col>{details.strength}</Col>
          <Col>{details.dexterity}</Col>
          <Col>{details.constitution}</Col>
          <Col>{details.intelligence}</Col>
          <Col>{details.wisdom}</Col>
          <Col>{details.charisma}</Col>
        </Row>
        <Row>
          <Col>Features:</Col>
        </Row>
        {details.special_abilities.map((feature) => (
          <Row key={feature.name}>
            <Col>
              {feature.name}: {feature.desc}
            </Col>
          </Row>
        ))}
        <Row>
          <Col>Actions:</Col>
        </Row>
        {details.actions.map((action) => (
          <Row key={action.name}>
            <Col>
              {action.name}: {action.desc}
            </Col>
          </Row>
        ))}
        <Row>
          <Col>
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
