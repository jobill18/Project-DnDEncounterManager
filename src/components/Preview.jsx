import React from "react";
import PreviewEncounterTable from "./PreviewEncounterTable";
import { useLoaderData, Link } from "react-router-dom";

function Preview() {
  const { encounters } = useLoaderData();
  const encounterCards = encounters.map((encounter) => (
    <tr key={encounter.encounterId}>
      <td>
        <h3>{encounter.encounterName}</h3>
      </td>
      <td>
        <Link
          to={`/encounters/${encounter.encounterId}`}
          encounterName={encounter.encounterName}
        >
          View Details
        </Link>
      </td>
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>
          <th colSpan={2}>
            <h1>Encounters</h1>
          </th>
        </tr>
      </thead>
      <tbody>{encounterCards}</tbody>
    </table>
  );
}

export default Preview;
