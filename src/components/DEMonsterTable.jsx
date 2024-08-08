import axios from "axios";
import React from "react";
import DERemoveMonsterButton from "./DERemoveMonsterButton";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import DEHealthTracker from "./DEHealthTracker";
import DEAttackRoll from "./DEAttackRoll";

function DEMonsterTable({ monster, isEditing, setMonsterList, monsterList }) {
  const { monsterName, monsterId, encounterId } = monster;
  const [details, setDetails] = useState(null);
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
          <Col className="h1">{monster.monsterName}</Col>
          <Col xs="1" className="fw-bold text-end">
            CR:{" "}
          </Col>
          <Col xs="1">{details.challenge_rating}</Col>
        </Row>
        <Row className="px-3 py-1">
          <DEHealthTracker
            maxHp={details.hit_points}
            monster={monster.monsterName}
          />
        </Row>
        <Row className="px-3 py-1">
          <Col className="fw-bold text-end">AC:</Col>
          <Col>{details.armor_class[0].value}</Col>
          <Col className="fw-bold text-end">HP:</Col>
          <Col>{details.hit_points}</Col>
          <Col className="fw-bold text-end">Speed:</Col>
          <Col>{details.speed.walk}</Col>
        </Row>
        <Row className="px-3 py-1 fw-bold text-center">
          <Col>STR</Col>
          <Col>DEX</Col>
          <Col>CON</Col>
          <Col>INT</Col>
          <Col>WIS</Col>
          <Col>CHA</Col>
        </Row>
        <Row className="px-3 py-1 text-center">
          <Col>{details.strength}</Col>
          <Col>{details.dexterity}</Col>
          <Col>{details.constitution}</Col>
          <Col>{details.intelligence}</Col>
          <Col>{details.wisdom}</Col>
          <Col>{details.charisma}</Col>
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
          <div key={action.name}>
            <Row className="px-3 py-1">
              <Col>
                {action.name}: {action.desc}
              </Col>
            </Row>

            <DEAttackRoll bonus={action.attack_bonus} />
          </div>
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
