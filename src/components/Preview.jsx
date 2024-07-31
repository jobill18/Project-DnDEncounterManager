import axios from "axios";
import React, { useState } from "react";
import PreviewEncounterTable from "./PreviewEncounterTable";
import { useLoaderData, Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Preview() {
  const user = useSelector((state) => state.user);
  const { encounters } = useLoaderData();
  const [displayEnc, setDisplayEnc] = useState(encounters);
  const [isLoading, setIsLoading] = useState(false);

  console.log(user);

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
    setIsLoading(true);
    const { data } = await axios.post("/api/encounters", {
      encounterName: "New Encounter new",
    });
    console.log(data);
    setDisplayEnc([...displayEnc, data]);
    setIsLoading(false);
  };

  return user ? (
    !isLoading ? (
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
    ) : (
      <h3>Loading Encounters...</h3>
    )
  ) : (
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
