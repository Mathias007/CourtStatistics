import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

import { DatabaseModels } from "../../config/DatabaseModels";
import { BCRYPT_SALT_ROUNDS } from "../../config/ConfigVariables";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface UserDocument extends Document {
    username: string;
    email: string;
    password: string;
}

const UserSchema: Schema<IUser> = new Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, maxlength: 60 },
    },
    { timestamps: true }
);

// UserSchema.pre<IUser>("save", async function (next) {
//     if (!this.isModified("password")) return next();
//     const salt = await bcrypt.genSalt(BCRYPT_SALT_ROUNDS);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

UserSchema.methods.comparePassword = function (
    candidatePassword: string
): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<IUser>(DatabaseModels.USER, UserSchema);
