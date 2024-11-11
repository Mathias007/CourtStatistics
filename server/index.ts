import express from "express";
import mongoose from "mongoose";

import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/DatabaseInitiator";

import { ConfigVariables } from "./config/ConfigVariables";
import { ServerPaths } from "./config/ServerPaths";

import CourtRouter from "./api/routes/Court.route";
import { seedDatabase } from "./api/seeders/Court.seeder";

const { clientURL, jwtSecret, portNumber } = ConfigVariables;
const { ROOT, COURTS } = ServerPaths;

const app = express();

connectDB().then(() => {
    seedDatabase();
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

app.listen(portNumber, () => {
    console.log(`Listening on ${portNumber}`);
});
