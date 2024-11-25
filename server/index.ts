import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { ConfigVariables, ServerPaths, DatabaseInitiator } from "./config";

import { CourtRouter, UserRouter } from "./api/routes";
import { CourtSeeder, UserSeeder } from "./api/seeders";

const { clientURL, portNumber } = ConfigVariables;
const { USERS, COURTS } = ServerPaths;

const app = express();

DatabaseInitiator().then(() => {
    CourtSeeder.seedCourtCollection();
    UserSeeder.seedUserCollection();
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
