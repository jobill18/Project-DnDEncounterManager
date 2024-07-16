import React from "react";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";

function EditMonsterSearchBar() {
  const { monsters } = useLoaderData();
  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onSearch = (searchTerm) => {
    setValue(searchTerm);
    // api search results
    console.log("search", searchTerm);
  };

  // const onAdd = searchTerm;

  console.log(monsters.results);

  let monsterList;

  if (value) {
    monsterList = monsters.results
      .filter((item) => {
        console.log(item);
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

  return (
    <div>
      <input
        type="text"
        placeholder="find a monster"
        value={value}
        onChange={onChange}
      />
      {/* <button onClick={() => onAdd(value)}>Add Monster</button> */}
      <div className="dropdown">{monsterList}</div>
    </div>
  );
}

export default EditMonsterSearchBar;
