import React from "react";
import { Col, Button } from "react-bootstrap";

function EditSaveEncounterButton({
  isEditing,
  onEditClick,
  onSaveClick,
  onDeleteClick,
}) {
  return !isEditing ? (
    <Col xs="2">
      <Button onClick={onEditClick}>Edit</Button>
    </Col>
  ) : (
    <>
      <Col xs="4">
        <Button onClick={onDeleteClick}>Delete Encounter</Button>
      </Col>
      <Col xs="2">
        <Button onClick={onSaveClick}>Save</Button>
      </Col>
    </>
  );
}

export default EditSaveEncounterButton;
