import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { ConfigVariables, ServerStatuses, ServerMessages } from "../../config";
const { AuthMiddlewareMessages } = ServerMessages;

const { UNAUTHORIZED } = ServerStatuses;

const JWT_SECRET = ConfigVariables.jwtSecret;

export const authorize = (
    req: Request,
    res: Response,
    next: NextFunction
): any => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res
            .status(UNAUTHORIZED)
            .json({ message: AuthMiddlewareMessages.NO_TOKEN });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
        // @ts-ignore
        req.userId = decoded.id;
        next();
    } catch {
        res.status(UNAUTHORIZED).json({
            message: AuthMiddlewareMessages.INCORRECT_TOKEN,
        });
    }
};
