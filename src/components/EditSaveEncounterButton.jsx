import React from "react";
import { Link } from "react-router-dom";

function EditSaveEncounterButton({
  isEditing,
  onEditClick,
  onSaveClick,
  onDeleteClick,
}) {
  return !isEditing ? (
    <button onClick={onEditClick}>Edit</button>
  ) : (
    <>
      <button onClick={onSaveClick}>Save</button>
      <button onClick={onDeleteClick}>Delete Encounter</button>
    </>
  );
}

export default EditSaveEncounterButton;
