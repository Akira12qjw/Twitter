import express from "express";
import usersRouter from "./routes/users.routes";
import databaseService from "./services/database.services";
import { defaultErrorHandler } from "./middlewares/error.middlewares";
import mediasRouter from "./routes/medias.routes";
import { initFolder } from "./utils/files";
import { config } from "dotenv";
import argv from "minimist";
import { UPLOAD_VIDEO_DIR } from "./constants/dir";
import staticRouter from "./routes/static.routes";
import cors from "cors";
import tweetsRouter from "./routes/tweets.routes";
const options = argv(process.argv.slice(2));
config();
databaseService.connect().then(() => {
  databaseService.indexUser();
  databaseService.indexRefreshToken();
  databaseService.indexVideoStatus();
  databaseService.indexFollowers();
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
app.use("/tweets", tweetsRouter);
app.use("/static", staticRouter);
app.use("/static/video", express.static(UPLOAD_VIDEO_DIR));

app.use(defaultErrorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port  http://localhost:${port}`);
});
