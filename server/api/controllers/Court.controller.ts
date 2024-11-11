import { Request, Response } from "express";
import * as courtService from "../services/Court.service";

export const getCourts = async (req: Request, res: Response) => {
    const courts = await courtService.getCourts();
    res.json(courts);
};

export const getCourtById = async (req: Request, res: Response) => {
    const court = await courtService.getCourtById(req.params.id);
    if (court) {
        res.json(court);
    } else {
        res.status(404).json({ message: "Court not found" });
    }
};

export const createCourt = async (req: Request, res: Response) => {
    const court = await courtService.createCourt(req.body);
    res.status(201).json(court);
};

export const updateCourt = async (req: Request, res: Response) => {
    const court = await courtService.updateCourt(req.params.id, req.body);
    if (court) {
        res.json(court);
    } else {
        res.status(404).json({ message: "Court not found" });
    }
};

export const deleteCourt = async (req: Request, res: Response) => {
    const court = await courtService.deleteCourt(req.params.id);
    if (court) {
        res.json({ message: "Court deleted" });
    } else {
        res.status(404).json({ message: "Court not found" });
    }
};
