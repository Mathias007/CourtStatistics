import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as userService from "../services/User.service";
import { ConfigVariables } from "../../config/ConfigVariables";

const JWT_SECRET = ConfigVariables.jwtSecret;

export const registerUser = async (
    req: Request,
    res: Response
): Promise<Response | any> => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res
                .status(400)
                .json({ message: "Wszystkie pola są wymagane" });
        }

        const existingUser = await userService.getUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({ message: "Użytkownik już istnieje" });
        }

        const newUser = await userService.createUser({
            username,
            email,
            password,
        });

        res.status(201).json({ message: "Rejestracja zakończona sukcesem" });
    } catch (error) {
        res.status(500).json({ message: "Błąd serwera", error });
    }
};

export const loginUser = async (
    req: Request,
    res: Response
): Promise<Response | any> => {
    try {
        const { email, password } = req.body;

        const user = await userService.getUserByEmail(email);

        if (!user) {
            return res.status(400).json({
                message: "Nie znaleziono użytkownika o podanym adresie email",
            });
        }

        const isPasswordValid = await userService.comparePassword(
            user,
            password
        );

        if (!isPasswordValid) {
            return res
                .status(400)
                .json({ message: "Podano nieprawidłowe hasło" });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, {
            expiresIn: "1h",
        });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: "Błąd serwera", error });
    }
};

export const getUsers = async (
    req: Request,
    res: Response
): Promise<Response | any> => {
    try {
        const users = await userService.getUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Błąd serwera", error });
    }
};

export const getUserById = async (
    req: Request,
    res: Response
): Promise<Response | any> => {
    try {
        const user = await userService.getUserById(req.params.id);

        if (!user) {
            return res
                .status(404)
                .json({ message: "Użytkownik nie znaleziony" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Błąd serwera", error: error.message });
    }
};

export const updateUser = async (
    req: Request,
    res: Response
): Promise<Response | any> => {
    try {
        const { id } = req.params;
        const { username, email } = req.body;

        const updatedUser = await userService.updateUser(id, {
            username,
            email,
        });

        if (!updatedUser) {
            return res
                .status(404)
                .json({ message: "Użytkownik nie znaleziony" });
        }

        res.status(200).json({
            _id: updatedUser.id,
            username: updatedUser.username,
            email: updatedUser.email,
        });
    } catch (error) {
        res.status(500).json({ message: "Błąd serwera", error: error.message });
    }
};

export const deleteUser = async (
    req: Request,
    res: Response
): Promise<Response | any> => {
    try {
        const { id } = req.params;
        const deletedUser = await userService.deleteUser(id);

        if (deletedUser) {
            res.status(200).json({ message: "Użytkownik usunięty" });
        } else {
            res.status(404).json({ message: "Użytkownik nie znaleziony" });
        }
    } catch (error) {
        res.status(500).json({ message: "Błąd serwera", error });
    }
};
