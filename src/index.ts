import express from "express";
import usersRouter from "./routers/users.routes";
import databaseService from "./services/database.services";
import { defaultErrorHandler } from "./middlewares/error.middlewares";
databaseService.connect();
const app = express();
const port = 3001;

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use("/users", usersRouter);

app.use(defaultErrorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port  http://localhost:${port}`);
});
