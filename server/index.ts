import express from "express";

import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/DatabaseInitiator";

import { ConfigVariables } from "./config/ConfigVariables";
import { ServerPaths } from "./config/ServerPaths";

import CourtRouter from "./api/routes/Court.route";
import UserRouter from "./api/routes/User.route";

import { seedCourtCollection } from "./api/seeders/Court.seeder";
import { seedUserCollection } from "./api/seeders/User.seeder";

const { clientURL, portNumber } = ConfigVariables;
const { USERS, COURTS } = ServerPaths;

const app = express();

connectDB().then(() => {
    seedCourtCollection();
    seedUserCollection();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
    cors({
        credentials: true,
        origin: clientURL,
    })
);

app.use(COURTS, CourtRouter);
app.use(USERS, UserRouter);

app.listen(portNumber, () => {
    console.log(`Serwer działa na porcie ${portNumber}`);
});
