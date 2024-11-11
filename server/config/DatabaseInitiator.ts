import mongoose from "mongoose";

import { ConfigVariables } from "./ConfigVariables";
const { connectionString } = ConfigVariables;

const connectDB = async () => {
    try {
        await mongoose.connect(connectionString);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

export default connectDB;
