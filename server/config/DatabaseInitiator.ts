import mongoose from "mongoose";

import { ConfigVariables, ServerMessages } from ".";

const { connectionString } = ConfigVariables;

const connectDB = async () => {
    try {
        await mongoose.connect(connectionString);
        console.log(ServerMessages.DatabaseMessages.CONNECTION_SUCCESS);
    } catch (error) {
        console.error(ServerMessages.DatabaseMessages.CONNECTION_ERROR, error);
        process.exit(1);
    }
};

export default connectDB;
