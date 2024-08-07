import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import DEMonsterTable from "./DEMonsterTable";
import EditSaveEncounterButton from "./EditSaveEncounterButton";
import EditMonsterSearchBar from "./EditMonsterSearchBar";
import EditEncounterName from "./EditEncounterName";
import { Container, Row, Col } from "react-bootstrap";

function DetailedView() {
  const { monsterEntries, encounter } = useLoaderData();
  const [isEditing, setIsEditing] = useState(false);
  const [encounterName, setEncounterName] = useState(encounter.encounterName);
  const [monsterList, setMonsterList] = useState(monsterEntries);
  const { encounterId } = encounter;
  const navigate = useNavigate();
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

  const setEditMode = () => setIsEditing(true);
  const setNormalMode = async () => {
    const encounter = await axios.put(`/api/encounters/${encounterId}`, {
      encounterName: encounterName,
    });
    console.log(encounter);
    setIsEditing(false);
  };

  const deleteEncounter = async () => {
    axios.delete(`/api/encounters/${encounterId}/delete`).then(() => {
      navigate("/encounters");
    });
  };

  const monsterCards = monsterList.map((monster) => (
    // console.log(monster),
    <DEMonsterTable
      key={monster.monsterId}
      monster={monster}
      isEditing={isEditing}
      monsterList={monsterList}
      setMonsterList={setMonsterList}
    />
  ));

  return user && user === encounter.userId ? (
    <div>
      <Container fluid>
        <Row className="p-3">
          <Col>
            <EditEncounterName
              value={encounterName}
              isEditing={isEditing}
              onValueChange={setEncounterName}
            />
          </Col>
          <EditSaveEncounterButton
            isEditing={isEditing}
            onEditClick={setEditMode}
            onSaveClick={setNormalMode}
            onDeleteClick={deleteEncounter}
          />
        </Row>
      </Container>
      {monsterCards}
      <EditMonsterSearchBar
        isEditing={isEditing}
        encounter={encounter}
        monsterList={monsterList}
        setMonsterList={setMonsterList}
      />
    </div>
  ) : (
    <div>
      <Container fluid>
        <Row className="p-3">
          <Col>
            <h2>{encounterName}</h2>
          </Col>
        </Row>
      </Container>
      {monsterCards}
    </div>
  );
}

export default DetailedView;
