import React from "react";

function EditAddMonsterButton({ isEditing }) {
  return isEditing && <button>Add Monster</button>;
}

export default EditAddMonsterButton;
