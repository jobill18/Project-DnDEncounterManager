import express from "express";
import morgan from "morgan";
import ViteExpress from "vite-express";

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

//api endpoints
app.get("/api/encounters", async (req, res) => {
  const allEncounters = await Encounter.findAll();
  res.json(allEncounters);
});

ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on http://localhost:${port}`)
);
