import express from "express";
import usersRouter from "./routers/users.routes";
import databaseService from "./services/database.services";
import { defaultErrorHandler } from "./middlewares/error.middlewares";
import mediasRouter from "./routers/medias.routes";
import { initFolder } from "./utils/files";
import { config } from "dotenv";
import argv from "minimist";
import { UPLOAD_VIDEO_DIR } from "./constants/dir";
import staticRouter from "./routers/static.routes";
import cors from "cors";
const options = argv(process.argv.slice(2));
config();
databaseService.connect().then(() => {
  databaseService.indexUser();
});
const app = express();
app.use(cors());
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
app.use("/static/video", express.static(UPLOAD_VIDEO_DIR));

app.use(defaultErrorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port  http://localhost:${port}`);
});
