import { User, Encounter, Monster, db } from "../src/model.js";
import encounterData from "./data/encounters.json" assert { type: "json" };

console.log("syncing database...");
await db.sync({ force: true });

console.log("Seeding database...");

const encountersInDB = await Promise.all(
  encounterData.map((encounter) => {
    const { encounterName } = encounter;
    const newEncounter = Encounter.create({
      encounterName: encounterName,
    });
    return newEncounter;
  })
);

console.log(encountersInDB);

const usersToCreate = [];
for (let i = 1; i < 3; i++) {
  const email = `user${i}@test.com`;
  usersToCreate.push(
    User.create({
      fname: `john${i}`,
      lname: `doe${i}`,
      email,
      password: "test",
    })
  );
}

const usersInDB = await Promise.all(usersToCreate);

const monstersToCreate = [];
const monsters = [
  {
    monsterName: "Hobgoblin",
    monsterUrl: "https://www.dnd5eapi.co/api/monsters/hobgoblin",
    encounterId: 1,
  },
  {
    monsterName: "Hobgoblin",
    monsterUrl: "https://www.dnd5eapi.co/api/monsters/hobgoblin",
    encounterId: 1,
  },
  {
    monsterName: "Guard",
    monsterUrl: "https://www.dnd5eapi.co/api/monsters/guard",
    encounterId: 2,
  },
  {
    monsterName: "Guard",
    monsterUrl: "https://www.dnd5eapi.co/api/monsters/guard",
    encounterId: 2,
  },
  {
    monsterName: "Veteran",
    monsterUrl: "https://www.dnd5eapi.co/api/monsters/veteran",
    encounterId: 2,
  },
];
for (const monster of monsters) {
  monstersToCreate.push(
    Monster.create({
      monsterName: monster.monsterName,
      monsterUrl: monster.monsterUrl,
      encounterId: monster.encounterId,
    })
  );
}

const monstersInDB = await Promise.all(monstersToCreate);

await db.close(console.log("Finished seeding database!"));
