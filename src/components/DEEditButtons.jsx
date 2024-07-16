import React from "react";
import { Link } from "react-router-dom";

function DEEditButtons() {
  return (
    <div>
      <button>
        <Link to={"/myencounters/:encounter_id/edit"}>Edit</Link>
      </button>
      <button>
        <Link to={"/myencounters"}>Delete</Link>
      </button>
    </div>
  );
}

export default DEEditButtons;
