import axios from "axios";
import React from "react";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";

function EditMonsterSearchBar({
  isEditing,
  encounter,
  monsterList,
  setMonsterList,
}) {
  const { monsterData } = useLoaderData();
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onSearch = (searchTerm) => {
    setValue(searchTerm);
  };

  let monsterDB;

  if (value) {
    monsterDB = monsterData.results
      .filter((item) => {
        const searchTerm = value.toLowerCase();
        const name = item.name.toLowerCase();
        return searchTerm && name.includes(searchTerm) && name !== searchTerm;
      })
      .map((item) => (
        <div
          onClick={() => onSearch(item.name)}
          className="dropdown-row"
          key={item.index}
        >
          {item.name}
        </div>
      ));
  }

  const addMonster = async () => {
    setLoading(true);
    const monster = monsterData.results.filter((item) => {
      return item.name === value;
    });
    console.log(monster);
    const newMonster = await axios.post(
      `/api/encounters/${encounter.encounterId}`,
      {
        monsterName: monster[0].name,
        monsterUrl: `https://www.dnd5eapi.co${monster[0].url}`,
      }
    );
    setValue("");
    setMonsterList([...monsterList, newMonster.data]);
    setLoading(false);
  };

  return (
    isEditing &&
    (!loading ? (
      <div>
        <input
          type="text"
          placeholder="find a monster"
          value={value}
          onChange={onChange}
        />
        <button onClick={() => addMonster()}>Add Monster</button>
        <div className="dropdown">{monsterDB}</div>
      </div>
    ) : (
      <div>Finding Monster...</div>
    ))
  );
}

export default EditMonsterSearchBar;
