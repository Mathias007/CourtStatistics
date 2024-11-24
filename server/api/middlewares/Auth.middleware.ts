import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ConfigVariables } from "../../config/ConfigVariables";

const JWT_SECRET = ConfigVariables.jwtSecret;

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
): any => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res
            .status(401)
            .json({ message: "Brak tokenu uwierzytelniającego" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
        //    @ts-ignore
        req.userId = decoded.id;
        next();
    } catch {
        res.status(401).json({ message: "Nieprawidłowy token" });
    }
};
