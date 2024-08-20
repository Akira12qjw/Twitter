import express from "express";
import usersRouter from "./routers/users.routes";
import databaseService from "./services/database.services";
import { defaultErrorHandler } from "./middlewares/error.middlewares";
import mediasRouter from "./routers/medias.routes";
import { initFolder } from "./utils/files";
import { config } from "dotenv";
import argv from "minimist";
import { UPLOAD_IMAGE_DIR } from "./constants/dir";
import staticRouter from "./routers/static.routes";
const options = argv(process.argv.slice(2));
config();
databaseService.connect();
const app = express();
const port = process.env.PORT || 3000;

console.log(options);

initFolder();

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use("/users", usersRouter);
app.use("/medias", mediasRouter);
app.use("/static", staticRouter);
// app.use("/static", express.static(UPLOAD_IMAGE_DIR));

app.use(defaultErrorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port  http://localhost:${port}`);
});
