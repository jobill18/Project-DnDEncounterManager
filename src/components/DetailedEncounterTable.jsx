import React from "react";
import DEMonsterTable from "./DEMonsterTable";
import DEEditButtons from "./DEEditButtons";

function DetailedEncounterTable() {
  return (
    <table>
      <thead>
        <tr>
          <th>Encounter Title</th>
          <th>
            <DEEditButtons />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <DEMonsterTable />
        </tr>
      </tbody>
    </table>
  );
}

export default DetailedEncounterTable;
