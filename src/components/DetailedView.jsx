import axios from "axios";
import React, { useState } from "react";
import { useLoaderData, Link, useNavigate } from "react-router-dom";
import DEMonsterTable from "./DEMonsterTable";
import EditSaveEncounterButton from "./EditSaveEncounterButton";
import EditMonsterSearchBar from "./EditMonsterSearchBar";
import EditAddMonsterButton from "./EditAddMonsterButton";
import EditEncounterName from "./EditEncounterName";
import { useSelector } from "react-redux";

function DetailedView() {
  const user = useSelector((state) => state.user);
  const { monsterEntries, encounter } = useLoaderData();
  const [isEditing, setIsEditing] = useState(false);
  const [encounterName, setEncounterName] = useState(encounter.encounterName);
  const [monsterList, setMonsterList] = useState(monsterEntries);
  const { encounterId } = encounter;
  const navigate = useNavigate();

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
      <EditEncounterName
        value={encounterName}
        isEditing={isEditing}
        onValueChange={setEncounterName}
      />
      <EditSaveEncounterButton
        isEditing={isEditing}
        onEditClick={setEditMode}
        onSaveClick={setNormalMode}
        onDeleteClick={deleteEncounter}
      />
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
      <h2>{encounterName}</h2>
      {monsterCards}
    </div>
  );
}

export default DetailedView;
