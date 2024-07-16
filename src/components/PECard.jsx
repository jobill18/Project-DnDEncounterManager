import React from "react";
import { Link } from "react-router-dom";

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
            <button>
              <Link to="/myencounters/:encounter_id">View Encounter</Link>
            </button>
          </td>
        </tr>
      </tfoot>
    </table>
  );
}

export default PECard;
