import React from "react";
import { Link } from "react-router-dom";

function EditSaveEncounterButton({ isEditing, onEditClick, onSaveClick }) {
  return !isEditing ? (
    <button onClick={onEditClick}>Edit</button>
  ) : (
    <button onClick={onSaveClick}>Save</button>
  );
}

export default EditSaveEncounterButton;
