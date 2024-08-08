import React from "react";
import { Button } from "react-bootstrap";

function DERemoveMonsterButton({ isEditing, monsterId, removeMonster }) {
  return (
    isEditing && (
      <Button variant="warning" onClick={() => removeMonster()}>
        Remove Monster
      </Button>
    )
  );
}

export default DERemoveMonsterButton;
