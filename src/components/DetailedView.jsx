import React from "react";
import { useLoaderData } from "react-router-dom";
import DEMonsterTable from "./DEMonsterTable";

function DetailedView() {
  const { monsterEntries, encounter } = useLoaderData();

  const monsterCards = monsterEntries.map((monster) => (
    <DEMonsterTable key={monster.monsterId} monster={monster} />
  ));

  return (
    <div>
      <h2>{encounter.encounterName}</h2>
      {monsterCards}
    </div>
  );
}

export default DetailedView;
