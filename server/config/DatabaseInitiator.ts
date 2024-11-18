import mongoose from "mongoose";

import { ConfigVariables } from "./ConfigVariables";
const { connectionString } = ConfigVariables;

const connectDB = async () => {
    try {
        await mongoose.connect(connectionString);
        console.log("Połączono z bazą MongoDB");
    } catch (error) {
        console.error("Wystąpił błąd połączenia z bazą MongoDB:", error);
        process.exit(1);
    }
};

export default connectDB;
