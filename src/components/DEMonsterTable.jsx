import React from "react";
import DEMonsterSearchBar from "./EditMonsterSearchBar";
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
    </table>
  );
}

export default DEMonsterTable;
