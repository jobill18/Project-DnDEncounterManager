import axios from "axios";
import React, { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
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

  // console.log(isEditing);

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

  const monsterCards = monsterList.map(
    (monster) => (
      console.log(monster),
      (
        <DEMonsterTable
          key={monster.monsterId}
          monster={monster}
          isEditing={isEditing}
        />
      )
    )
  );

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
      />
      {monsterCards}

      <EditMonsterSearchBar
        isEditing={isEditing}
        encounter={encounter}
        monsterList={monsterList}
        setMonsterList={setMonsterList}
      />
      {/* <EditAddMonsterButton isEditing={isEditing} /> */}
    </div>
  );
}

export default DetailedView;
