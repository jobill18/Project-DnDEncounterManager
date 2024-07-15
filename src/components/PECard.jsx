import React from "react";

function PECard() {
  return (
    <table>
      <thead>
        <tr>
          <th>Encounter Title</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Encounter Data</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>
            <button>View Encounter</button>
          </td>
        </tr>
      </tfoot>
    </table>
  );
}

export default PECard;
