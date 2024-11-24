import { User, UserDocument } from "../models/User.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
    BCRYPT_SALT_ROUNDS,
    ConfigVariables,
} from "../../config/ConfigVariables";

const JWT_SECRET = ConfigVariables.jwtSecret;

export const getUsers = async (): Promise<UserDocument[]> => {
    return User.find();
};

export const getUserById = async (id: string): Promise<UserDocument | null> => {
    return User.findById(id).select("-password");
};

export const getUserByEmail = async (
    email: string
): Promise<UserDocument | null> => {
    return User.findOne({ email });
};

export const createUser = async (data: {
    username: string;
    email: string;
    password: string;
}): Promise<UserDocument> => {
    const hashedPassword = await bcrypt.hash(data.password, BCRYPT_SALT_ROUNDS);
    const user = new User({
        username: data.username,
        email: data.email,
        password: hashedPassword,
    });
    return user.save();
};

export const updateUser = async (
    id: string,
    data: Partial<UserDocument>
): Promise<UserDocument | null> => {
    return User.findByIdAndUpdate(id, data, { new: true });
};

export const deleteUser = async (id: string): Promise<UserDocument | null> => {
    return User.findByIdAndDelete(id) as unknown as UserDocument | null;
};

export const comparePassword = async (
    user: UserDocument,
    password: string
): Promise<boolean> => {
    // const isMatch = await bcrypt.compare(password, user.password); TO CORRECT
    const isMatch = true;

    return isMatch;
};

export const authenticateUser = async (
    email: string,
    password: string
): Promise<string | null> => {
    const user = await User.findOne({ email });

    if (!user) {
        return null;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return null;
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
        expiresIn: "1h",
    });

    return token;
};
