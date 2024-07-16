import React from "react";
import EditSaveEncounterButton from "./EditSaveEncounterButton";
import EditMonsterSearchBar from "./EditMonsterSearchBar";
import EditAddMonsterButton from "./EditAddMonsterButton";
import DEMonsterTable from "./DEMonsterTable";

function EditEncounter() {
  return (
    <table>
      <thead>
        <tr>
          <th>Encounter Title</th>
          <th>
            <EditSaveEncounterButton />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <DEMonsterTable />
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>
            <EditMonsterSearchBar />
            <EditAddMonsterButton />
          </td>
        </tr>
      </tfoot>
    </table>
  );
}

export default EditEncounter;
