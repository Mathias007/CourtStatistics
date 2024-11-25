import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserService } from "../services";

import { ConfigVariables, ServerMessages, ServerStatuses } from "../../config";
const { UserMessages } = ServerMessages;

const { OK, CREATED, BAD_REQUEST, NOT_FOUND, INTERNAL_ERROR } = ServerStatuses;

const JWT_SECRET = ConfigVariables.jwtSecret;

export const registerUser = async (
    req: Request,
    res: Response
): Promise<Response | any> => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res
                .status(BAD_REQUEST)
                .json({ message: UserMessages.ALL_FIELDS_REQUIRED });
        }

        const existingUser = await UserService.getUserByEmail(email);

        if (existingUser) {
            return res
                .status(BAD_REQUEST)
                .json({ message: UserMessages.USER_ALREADY_EXISTS });
        }

        const newUser = await UserService.createUser({
            username,
            email,
            password,
        });

        res.status(CREATED).json({
            message: UserMessages.REGISTRATION_SUCCESS,
        });
    } catch (error) {
        res.status(INTERNAL_ERROR).json({
            message: UserMessages.REGISTRATION_ERROR,
            error,
        });
    }
};

export const loginUser = async (
    req: Request,
    res: Response
): Promise<Response | any> => {
    try {
        const { email, password } = req.body;

        const user = await UserService.getUserByEmail(email);

        if (!user) {
            return res.status(BAD_REQUEST).json({
                message: UserMessages.WRONG_EMAIL,
            });
        }

        const isPasswordValid = await UserService.comparePassword(
            user,
            password
        );

        if (!isPasswordValid) {
            return res
                .status(BAD_REQUEST)
                .json({ message: UserMessages.WRONG_PASSWORD });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, {
            expiresIn: "1h",
        });

        res.status(OK).json({ token });
    } catch (error) {
        res.status(INTERNAL_ERROR).json({
            message: UserMessages.LOGIN_ERROR,
            error,
        });
    }
};

export const getUsers = async (
    req: Request,
    res: Response
): Promise<Response | any> => {
    try {
        const users = await UserService.getUsers();
        res.status(OK).json(users);
    } catch (error) {
        res.status(INTERNAL_ERROR).json({
            message: UserMessages.GET_USERS_ERROR,
            error,
        });
    }
};

export const getUserById = async (
    req: Request,
    res: Response
): Promise<Response | any> => {
    try {
        const user = await UserService.getUserById(req.params.id);

        if (!user) {
            return res
                .status(NOT_FOUND)
                .json({ message: UserMessages.USER_NOT_FOUND });
        }

        res.status(OK).json(user);
    } catch (error) {
        res.status(INTERNAL_ERROR).json({
            message: UserMessages.GET_USER_ERROR,
            error: error.message,
        });
    }
};

export const updateUser = async (
    req: Request,
    res: Response
): Promise<Response | any> => {
    try {
        const { id } = req.params;
        const { username, email } = req.body;

        const updatedUser = await UserService.updateUser(id, {
            username,
            email,
        });

        if (!updatedUser) {
            return res
                .status(NOT_FOUND)
                .json({ message: UserMessages.USER_NOT_FOUND });
        }

        res.status(OK).json({
            _id: updatedUser.id,
            username: updatedUser.username,
            email: updatedUser.email,
        });
    } catch (error) {
        res.status(INTERNAL_ERROR).json({
            message: UserMessages.UPDATE_USER_ERROR,
            error: error.message,
        });
    }
};

export const deleteUser = async (
    req: Request,
    res: Response
): Promise<Response | any> => {
    try {
        const { id } = req.params;
        const deletedUser = await UserService.deleteUser(id);

        if (deletedUser) {
            res.status(OK).json({ message: UserMessages.USER_DELETED });
        } else {
            res.status(NOT_FOUND).json({
                message: UserMessages.USER_NOT_FOUND,
            });
        }
    } catch (error) {
        res.status(INTERNAL_ERROR).json({
            message: UserMessages.DELETE_USER_ERROR,
            error,
        });
    }
};
