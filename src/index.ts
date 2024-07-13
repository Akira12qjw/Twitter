import express from "express";
import usersRouter from "./routers/users.routers";
import databaseService from "./services/database.services";
const app = express();
const port = 3000;

app.use(express.json);
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use("/users", usersRouter);
databaseService.connect();

app.listen(port, () => {
  console.log(`Example app listening on port  http://localhost:${port}`);
});
