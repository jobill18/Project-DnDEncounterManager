import React from "react";
import { Link } from "react-router-dom";

function EditSaveEncounterButton() {
  return (
    <button>
      <Link to={"/myencounters/:encounter_id"}>Save</Link>
    </button>
  );
}

export default EditSaveEncounterButton;
