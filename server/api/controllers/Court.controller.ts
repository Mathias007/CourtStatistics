import { Request, Response } from "express";
import * as courtService from "../services/Court.service";

export const getCourts = async (
    req: Request,
    res: Response
): Promise<Response | any> => {
    const courts = await courtService.getCourts();
    res.json(courts);
};

export const getCourtById = async (
    req: Request,
    res: Response
): Promise<Response | any> => {
    const court = await courtService.getCourtById(req.params.id);
    if (court) {
        res.json(court);
    } else {
        res.status(404).json({ message: "Court not found" });
    }
};

export const getStatisticsByCourt = async (
    req: Request,
    res: Response
): Promise<Response | any> => {
    const { courtId, year, category } = req.params;

    try {
        const court = await courtService.getCourtById(courtId);
        if (!court) return res.status(404).json({ message: "Court not found" });

        const filteredStats = court.statistics.filter(
            (stat) =>
                stat.year === Number(year) &&
                stat.category === category.toUpperCase()
        );

        if (!filteredStats.length)
            return res.status(404).json({
                message: "No statistics found for the given criteria",
            });

        res.status(200).json(filteredStats);
    } catch (error) {
        res.status(500).json({ message: "Error fetching statistics", error });
    }
};

export const createCourt = async (
    req: Request,
    res: Response
): Promise<Response | any> => {
    const court = await courtService.createCourt(req.body);
    res.status(201).json(court);
};

export const addStatisticToCourt = async (
    req: Request,
    res: Response
): Promise<Response | any> => {
    const { courtId } = req.params;
    const newStatistic = req.body;

    try {
        const court = await courtService.getCourtById(courtId);
        if (!court) return res.status(404).json({ message: "Court not found" });

        const maxId = Math.max(0, ...court.statistics.map((stat) => stat.id));
        newStatistic.id = maxId + 1;

        court.statistics.push(newStatistic);
        await court.save();

        res.status(201).json(court);
    } catch (error) {
        res.status(500).json({ message: "Error adding statistic", error });
    }
};

export const updateCourt = async (
    req: Request,
    res: Response
): Promise<Response | any> => {
    const court = await courtService.updateCourt(req.params.id, req.body);
    if (court) {
        res.json(court);
    } else {
        res.status(404).json({ message: "Court not found" });
    }
};

export const updateStatisticById = async (
    req: Request,
    res: Response
): Promise<Response | any> => {
    const { courtId, statisticId } = req.params;
    const updatedData = req.body;

    try {
        const court = await courtService.getCourtById(courtId);
        if (!court) return res.status(404).json({ message: "Court not found" });

        const statistic = court.statistics.find(
            (stat) => stat.id === Number(statisticId)
        );

        if (!statistic)
            return res.status(404).json({ message: "Statistic not found" });

        Object.assign(statistic, updatedData);
        await court.save();

        res.status(200).json(court);
    } catch (error) {
        res.status(500).json({ message: "Error updating statistic", error });
    }
};

export const deleteCourt = async (
    req: Request,
    res: Response
): Promise<Response | any> => {
    const court = await courtService.deleteCourt(req.params.id);
    if (court) {
        res.json({ message: "Court deleted" });
    } else {
        res.status(404).json({ message: "Court not found" });
    }
};

export const deleteStatisticById = async (
    req: Request,
    res: Response
): Promise<Response | any> => {
    const { courtId, statisticId } = req.params;

    try {
        const court = await courtService.getCourtById(courtId);
        if (!court) return res.status(404).json({ message: "Court not found" });

        const statisticIndex = court.statistics.findIndex(
            (stat) => stat.id === Number(statisticId)
        );

        if (statisticIndex === -1)
            return res.status(404).json({ message: "Statistic not found" });

        court.statistics.splice(statisticIndex, 1);
        await court.save();

        res.status(200).json(court);
    } catch (error) {
        res.status(500).json({ message: "Error deleting statistic", error });
    }
};

export const addStatistic = async (
    req: Request,
    res: Response
): Promise<Response | any> => {
    const { courtId } = req.params;
    const newStatistic = req.body;

    try {
        const court = await courtService.getCourtById(courtId);
        if (!court) return res.status(404).json({ message: "Court not found" });

        court.statistics.push(newStatistic);
        await court.save();

        res.status(201).json(court);
    } catch (error) {
        res.status(500).json({ message: "Error adding statistic", error });
    }
};
