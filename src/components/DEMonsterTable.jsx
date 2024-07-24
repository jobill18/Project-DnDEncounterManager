import axios from "axios";
import React from "react";
import DERemoveMonsterButton from "./DERemoveMonsterButton";
import { useState, useEffect } from "react";
import EditMonsterSearchBar from "./EditMonsterSearchBar";
import EditAddMonsterButton from "./EditAddMonsterButton";

function DEMonsterTable({ monster, isEditing, setMonsterList, monsterList }) {
  const [details, setDetails] = useState(null);

  const { monsterId, encounterId } = monster;

  const removeMonster = async () => {
    axios
      .delete(`/api/encounters/${encounterId}/${monsterId}/delete`)
      .then(() => {
        const newMonsterListCopy = [...monsterList];
        const newMonsterList = newMonsterListCopy.filter((monsterEntry) => {
          return monsterEntry.monsterId !== +monsterId;
        });
        setMonsterList(newMonsterList);
      });
  };

  useEffect(() => {
    monsterDetails();
  }, []);

  function monsterDetails() {
    axios.get(monster.monsterUrl).then((res) => {
      setDetails(res.data);
    });
  }

  return (
    details && (
      <table key={monster.monsterId}>
        <thead>
          <tr>
            <th colSpan={4}>
              <h3>{monster.monsterName}</h3>
            </th>
            <th>CR:</th>
            <th>{details.challenge_rating}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={2}>AC: {details.armor_class[0].value}</td>
            <td colSpan={2}>HP: {details.hit_points}</td>
            <td colSpan={2}>Speed: {details.speed.walk}</td>
          </tr>
          <tr>
            <td>STR</td>
            <td>DEX</td>
            <td>CON</td>
            <td>INT</td>
            <td>WIS</td>
            <td>CHA</td>
          </tr>
          <tr>
            <td>{details.strength}</td>
            <td>{details.dexterity}</td>
            <td>{details.constitution}</td>
            <td>{details.intelligence}</td>
            <td>{details.wisdom}</td>
            <td>{details.charisma}</td>
          </tr>
          <tr>
            <td>Features:</td>
          </tr>
          {details.special_abilities.map((feature) => (
            <tr key={feature.name}>
              <td colSpan={6}>
                {feature.name}: {feature.desc}
              </td>
            </tr>
          ))}
          <tr>
            <td>Actions:</td>
          </tr>
          {details.actions.map((action) => (
            <tr key={action.name}>
              <td colSpan={6}>
                {action.name}: {action.desc}
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={6}>
              <DERemoveMonsterButton
                isEditing={isEditing}
                removeMonster={removeMonster}
                monsterId={monsterId}
              />
            </td>
          </tr>
        </tbody>
      </table>
    )
  );
}

export default DEMonsterTable;
