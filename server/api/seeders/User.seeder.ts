import bcrypt from "bcryptjs";

import { UserModel } from "../models";

import { ConfigVariables, ServerMessages } from "../../config";
const { DatabaseMessages } = ServerMessages;

const sampleUser = {
    username: "Admin",
    email: "admin@example.com",
    password: "admin123",
};

export const seedUserCollection = async () => {
    try {
        const existingUser = await UserModel.User.findOne({
            email: sampleUser.email,
        });

        if (!existingUser) {
            const hashedPassword = await bcrypt.hash(
                sampleUser.password,
                ConfigVariables.BCRYPT_SALT_ROUNDS
            );

            const newUser = new UserModel.User({
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
