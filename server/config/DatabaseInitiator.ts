import mongoose from "mongoose";

import { DatabaseMessages } from "./ServerMessages";
import { ConfigVariables } from "./ConfigVariables";
const { connectionString } = ConfigVariables;

const connectDB = async () => {
    try {
        await mongoose.connect(connectionString);
        console.log(DatabaseMessages.CONNECTION_SUCCESS);
    } catch (error) {
        console.error(DatabaseMessages.CONNECTION_ERROR, error);
        process.exit(1);
    }
};

export default connectDB;
