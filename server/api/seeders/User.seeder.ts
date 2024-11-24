import { BCRYPT_SALT_ROUNDS } from "../../config/ConfigVariables";
import { User } from "../models/User.model";
import bcrypt from "bcryptjs";

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
            console.log("Testowy użytkownik został zapisany.");
        } else {
            console.log("Testowy użytkownik już istnieje.");
        }
    } catch (error) {
        console.error("Błąd podczas dodawania użytkownika:", error);
    }
};
