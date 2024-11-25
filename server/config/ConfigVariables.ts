import dotenv from "dotenv";

dotenv.config();

const ConfigVariables = {
    connectionString: process.env.DB_CONNECTION_STRING || "",
    jwtSecret: process.env.JWT_SECRET || "",
    clientURL: process.env.CLIENT_URL || "",
    portNumber: Number(process.env.PORT_NUMBER) || 5000,
    BCRYPT_SALT_ROUNDS: 10,
};

export default ConfigVariables;
