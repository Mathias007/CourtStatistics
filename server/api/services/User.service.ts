import bcrypt from "bcryptjs";

import { UserModel } from "../models";
import { ConfigVariables } from "../../config";

const JWT_SECRET = ConfigVariables.jwtSecret;

export const getUsers = async (): Promise<UserModel.UserDocument[]> => {
    return UserModel.User.find();
};

export const getUserById = async (
    id: string
): Promise<UserModel.UserDocument | null> => {
    return UserModel.User.findById(id).select("-password");
};

export const getUserByEmail = async (
    email: string
): Promise<UserModel.UserDocument | null> => {
    return UserModel.User.findOne({ email });
};

export const createUser = async (data: {
    username: string;
    email: string;
    password: string;
}): Promise<UserModel.UserDocument> => {
    const hashedPassword = await bcrypt.hash(
        data.password,
        ConfigVariables.BCRYPT_SALT_ROUNDS
    );
    const user = new UserModel.User({
        username: data.username,
        email: data.email,
        password: hashedPassword,
    });
    return user.save();
};

export const updateUser = async (
    id: string,
    data: Partial<UserModel.UserDocument>
): Promise<UserModel.UserDocument | null> => {
    return UserModel.User.findByIdAndUpdate(id, data, { new: true });
};

export const deleteUser = async (
    id: string
): Promise<UserModel.UserDocument | null> => {
    return UserModel.User.findByIdAndDelete(
        id
    ) as unknown as UserModel.UserDocument | null;
};

export const comparePassword = async (
    user: UserModel.UserDocument,
    password: string
): Promise<boolean> => {
    const isMatch = await bcrypt.compare(password, user.password);

    return isMatch;
};
