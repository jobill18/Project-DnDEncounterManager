import React from "react";

function EditEncounterName({ value, isEditing, onValueChange }) {
  return isEditing ? (
    <h2>
      <input
        type="text"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
      />
    </h2>
  ) : (
    <h2>{value}</h2>
  );
}

export default EditEncounterName;
