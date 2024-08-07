import axios from "axios";
import React from "react";
import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
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
        <Row key={item.index} className="px-3">
          <Col onClick={() => onSearch(item.name)} className="droColdown-row">
            {item.name}
          </Col>
        </Row>
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
      <Container fluid>
        <Row className="px-3 pt-3">
          <Col>
            <input
              type="text"
              placeholder="find a monster"
              value={value}
              onChange={onChange}
            />
          </Col>
          <Col xs="3" className="text-center">
            <Button onClick={() => addMonster()}>Add Monster</Button>
          </Col>
        </Row>
        <div className="dropdown">{monsterDB}</div>
      </Container>
    ) : (
      <Container fluid>
        <Row>
          <Col>
            <h3>Finding Monster...</h3>
          </Col>
        </Row>
      </Container>
    ))
  );
}

export default EditMonsterSearchBar;
