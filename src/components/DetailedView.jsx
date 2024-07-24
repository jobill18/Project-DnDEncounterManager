import axios from "axios";
import React, { useState } from "react";
import { useLoaderData, Link, useNavigate } from "react-router-dom";
import DEMonsterTable from "./DEMonsterTable";
import EditSaveEncounterButton from "./EditSaveEncounterButton";
import EditMonsterSearchBar from "./EditMonsterSearchBar";
import EditAddMonsterButton from "./EditAddMonsterButton";
import EditEncounterName from "./EditEncounterName";

function DetailedView() {
  const { monsterEntries, encounter } = useLoaderData();
  const [isEditing, setIsEditing] = useState(false);
  const [encounterName, setEncounterName] = useState(encounter.encounterName);
  const [monsterList, setMonsterList] = useState(monsterEntries);
  const { encounterId } = encounter;
  const navigate = useNavigate();

  const setEditMode = () => setIsEditing(true);
  const setNormalMode = () => setIsEditing(false);
  // const setNormalMode = async () => {
  //   const { encounter } = await axios.put(
  //     `/api/encounters/${encounter.encounterId}`,
  //     {
  //       encounterName,
  //     }
  //   );

  //   if (!encounter.error) {
  //     setEncounterName(encounter.encounterName);
  //   }
  //   setIsEditing(false);
  // };

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

  return (
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
  );
}

export default DetailedView;
