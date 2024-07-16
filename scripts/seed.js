import { User, Encounter, Monster, db } from "../src/model";
import encounterData from "./data/encounters.json" assert {type:json}

console.log('syncing database...')
await db.sync({force:true})

onselect.log('Seeding database...')