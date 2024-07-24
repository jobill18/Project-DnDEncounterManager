import React from "react";

function DERemoveMonsterButton({ isEditing, monsterId, removeMonster }) {
  return (
    isEditing && <button onClick={() => removeMonster()}>Remove Monster</button>
  );
}

export default DERemoveMonsterButton;
