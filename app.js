import express from "express";
import session from "express-session";
import morgan from "morgan";
import ViteExpress from "vite-express";
import { Encounter, User, Monster } from "./src/model.js";
import { Op } from "sequelize";

const app = express();
const port = 8000;

app.use(morgan("dev"));
app.use(express.urlencoded({ extend: false }));
app.use(express.json());
app.use(
  session({ secret: "ssshhhhh", saveUninitialized: true, resave: false })
);

ViteExpress.config({ printViteDevServerHost: true });

function loginRequired(req, res, next) {
  if (!req.session.userId) {
    res.status(401).json({ error: "Unauthorized" });
  } else {
    next();
  }
}

//****************************START API enpoints******************************//

//view all encounters - extra functionality with login
app.get("/api/encounters", async (req, res) => {
  const user = req.session.userId;
  console.log(user);
  if (user) {
    const allEncounters = await Encounter.findAll({
      where: { [Op.or]: [{ userId: user }, { userId: null }] },
    });
    res.json(allEncounters);
  } else {
    const sharedEncounters = await Encounter.findAll({
      where: { userId: null },
    });
    res.json(sharedEncounters);
  }
});

//---------------------------api endpoints - no authorization-----------------------------//

//view encounter details
app.get("/api/encounters/:encounterId", async (req, res) => {
  const { encounterId } = req.params;
  const monsters = await Monster.findAll({
    where: { encounterId: encounterId },
  });
  const encounter = await Encounter.findByPk(encounterId);
  res.json({ monsters, encounter });
});

//login
app.post("/api/auth", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: { email: email },
  });
  if (user && user.password === password) {
    req.session.userId = user.userId;
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

//create new user
app.post("/api/user", async (req, res) => {
  const { fname, lname, email, password } = req.body;

  const user = await User.create({
    fname: fname,
    lname: lname,
    email: email,
    password: password,
  });

  res.json(user);
});

//-------------------api endpoints that require authorization--------------------------//

//logout
app.post("/api/logout", loginRequired, (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

//create new encounter with blank name
app.post("/api/encounters", loginRequired, async (req, res) => {
  const { userId } = req.session;
  const { encounterName } = req.body;

  const user = await User.findByPk(userId);
  const encounter = await user.createEncounter({
    encounterName: encounterName,
  });
  res.json(encounter);
});

//edit encounter name with encounterId
app.put("/api/encounters/:encounterId", loginRequired, async (req, res) => {
  const { user } = req.session;
  const { encounterId } = req.params;
  const { encounterName } = req.body;
  const userId = user.userId;

  const encounter = await Encounter.findByPk(encounterId);

  if (user && encounter.userId === userId) {
    encounter.encounterName = encounterName;
    await encounter.save();
  } else {
    alert(
      "You are not logged in. You may only edit an encounter if you are logged in."
    );
  }
  res.json(encounter);
});

//delete encounter with encounterId
app.delete(
  "/api/encounters/:encounterId/delete",
  loginRequired,
  async (req, res) => {
    const { userId } = req.session;
    const { encounterId } = req.params;
    const encounter = await Encounter.findByPk(encounterId);

    if (encounter.userId === userId) {
      await encounter.destroy();
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  }
);

//add monster with encounterId
app.post("/api/encounters/:encounterId", loginRequired, async (req, res) => {
  const { encounterId } = req.params;
  const { monsterName, monsterUrl } = req.body;

  const monster = await Monster.create({
    monsterName: monsterName,
    monsterUrl: monsterUrl,
    encounterId: encounterId,
  });
  res.json(monster);
});

//delete monster from encounter with encounterId
app.delete(
  "/api/encounters/:encounterId/:monsterId/delete",
  loginRequired,
  async (req, res) => {
    const { userId } = req.session;
    const { encounterId, monsterId } = req.params;

    const encounter = await Encounter.findByPk(encounterId);
    const monster = await Monster.findByPk(monsterId);

    if (encounter.userId === userId) {
      await monster.destroy();
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  }
);

//********************************END API endpoints************************************//

ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on http://localhost:${port}`)
);
