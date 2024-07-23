import axios from "axios";
import React, { useState } from "react";
import PreviewEncounterTable from "./PreviewEncounterTable";
import { useLoaderData, Link } from "react-router-dom";

function Preview() {
  const { encounters } = useLoaderData();
  const [displayEnc, setDisplayEnc] = useState(encounters);

  const encounterCards = displayEnc.map((encounter) => (
    <tr key={encounter.encounterId}>
      <td>
        <h3>{encounter.encounterName}</h3>
      </td>
      <td>
        <Link to={`/encounters/${encounter.encounterId}`}>View Details</Link>
      </td>
    </tr>
  ));

  const addEncounter = async () => {
    const { data } = await axios.post("/api/encounters", {
      encounterName: "New Encounter new",
    });
    console.log(data);
    setDisplayEnc([...displayEnc, data]);
  };

  return (
    <table>
      <thead>
        <tr>
          <th colSpan={2}>
            <h1>Encounters</h1>
            <button type="sumbit" onClick={addEncounter}>
              Add Encounter
            </button>
          </th>
        </tr>
      </thead>
      <tbody>{encounterCards}</tbody>
    </table>
  );
}

export default Preview;
