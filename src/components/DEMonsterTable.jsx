import React from "react";
import DEMonsterSearchBar from "./DEMonsterSearchBar";
import DERemoveMonsterButton from "./DERemoveMonsterButton";

function DEMonsterTable() {
  return (
    <table>
      <thead>
        <tr>
          <th>Monster Name</th>
        </tr>
      </thead>
      <tbody>
        <tr>Monster Data</tr>
        <tr>
          <DERemoveMonsterButton />
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>
            <DEMonsterSearchBar />
          </td>
        </tr>
      </tfoot>
    </table>
  );
}

export default DEMonsterTable;
