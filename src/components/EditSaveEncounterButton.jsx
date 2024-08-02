import React from "react";
import { Col } from "react-bootstrap";

function EditSaveEncounterButton({
  isEditing,
  onEditClick,
  onSaveClick,
  onDeleteClick,
}) {
  return !isEditing ? (
    <Col>
      <button onClick={onEditClick}>Edit</button>
    </Col>
  ) : (
    <Col>
      <button onClick={onSaveClick}>Save</button>
      <button onClick={onDeleteClick}>Delete Encounter</button>
    </Col>
  );
}

export default EditSaveEncounterButton;
