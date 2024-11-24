import { BCRYPT_SALT_ROUNDS } from "../../config/ConfigVariables";
import { User } from "../models/User.model";
import bcrypt from "bcryptjs";

import { DatabaseMessages } from "../../config/ServerMessages";

const sampleUser = {
    username: "Admin",
    email: "admin@example.com",
    password: "admin123",
};

export const seedUserCollection = async () => {
    try {
        const existingUser = await User.findOne({ email: sampleUser.email });

        if (!existingUser) {
            const hashedPassword = await bcrypt.hash(
                sampleUser.password,
                BCRYPT_SALT_ROUNDS
            );

            const newUser = new User({
                username: sampleUser.username,
                email: sampleUser.email,
                password: hashedPassword,
            });

            await newUser.save();
            console.log(DatabaseMessages.USER_SEED_FILLED);
        } else {
            console.log(DatabaseMessages.USER_SEED_UNNECESSARY);
        }
    } catch (error) {
        console.error(DatabaseMessages.USER_SEED_ERROR, error);
    }
};
