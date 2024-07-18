import React from "react";
import PECard from "./PECard.jsx";
import { Link } from "react-router-dom";

function PreviewEncounterTable(encounters) {
  const encounterCards = encounters.map((encounter) => (
    <div key={encounter.encounterId}>
      <h1>{encounter.encounterName}</h1>
      <Link to={`/encounters/${encounter.encounterId}`} />
    </div>
  ));

  return (
    <table>
      <thead>
        <tr>
          <th>PreviewEncounterTable</th>
        </tr>
      </thead>
      <tbody>
        <tr>{encounterCards}</tr>
      </tbody>
    </table>
  );
}

export default PreviewEncounterTable;
