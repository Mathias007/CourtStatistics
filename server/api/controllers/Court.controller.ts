import { Request, Response } from "express";
import * as courtService from "../services/Court.service";

import { ServerStatuses } from "../../config/ServerStatuses";
import { CourtMessages } from "../../config/ServerMessages";

const { OK, CREATED, NOT_FOUND, INTERNAL_ERROR } = ServerStatuses;

export const getCourts = async (
    req: Request,
    res: Response
): Promise<Response | any> => {
    try {
        const courts = await courtService.getCourts();
        res.status(OK).json(courts);
    } catch (error) {
        res.status(INTERNAL_ERROR).json({
            message: CourtMessages.GET_COURTS_ERROR,
            error,
        });
    }
};

export const getCourtById = async (
    req: Request,
    res: Response
): Promise<Response | any> => {
    try {
        const court = await courtService.getCourtById(req.params.id);

        if (court) {
            res.status(OK).json(court);
        } else {
            res.status(NOT_FOUND).json({
                message: CourtMessages.COURT_NOT_FOUND,
            });
        }
    } catch (error) {
        res.status(INTERNAL_ERROR).json({
            message: CourtMessages.GET_COURT_BY_ID_ERROR,
            error,
        });
    }
};

export const getStatisticsByCourt = async (
    req: Request,
    res: Response
): Promise<Response | any> => {
    const { courtId, year, category } = req.params;

    try {
        const court = await courtService.getCourtById(courtId);
        if (!court)
            return res
                .status(NOT_FOUND)
                .json({ message: CourtMessages.COURT_NOT_FOUND });

        const filteredStats = court.statistics.filter(
            (stat) =>
                stat.year === Number(year) &&
                stat.category === category.toUpperCase()
        );

        if (!filteredStats.length)
            return res.status(NOT_FOUND).json({
                message: CourtMessages.STATISTICS_NOT_FOUND,
            });

        res.status(OK).json(filteredStats);
    } catch (error) {
        res.status(INTERNAL_ERROR).json({
            message: CourtMessages.GET_STATISTICS_BY_COURT_ERROR,
            error,
        });
    }
};

export const createCourt = async (
    req: Request,
    res: Response
): Promise<Response | any> => {
    const court = await courtService.createCourt(req.body);
    res.status(CREATED).json(court);
};

export const addStatisticToCourt = async (
    req: Request,
    res: Response
): Promise<Response | any> => {
    const { courtId } = req.params;
    const newStatistic = req.body;

    try {
        const court = await courtService.getCourtById(courtId);
        if (!court)
            return res
                .status(NOT_FOUND)
                .json({ message: CourtMessages.COURT_NOT_FOUND });

        const maxId = Math.max(0, ...court.statistics.map((stat) => stat.id));
        newStatistic.id = maxId + 1;

        court.statistics.push(newStatistic);
        await court.save();

        res.status(CREATED).json(court);
    } catch (error) {
        res.status(INTERNAL_ERROR).json({
            message: CourtMessages.ADD_COURT_ERROR,
            error,
        });
    }
};

export const updateCourt = async (
    req: Request,
    res: Response
): Promise<Response | any> => {
    const court = await courtService.updateCourt(req.params.id, req.body);
    if (court) {
        res.status(OK).json(court);
    } else {
        res.status(NOT_FOUND).json({ message: CourtMessages.COURT_NOT_FOUND });
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
        if (!court)
            return res
                .status(NOT_FOUND)
                .json({ message: CourtMessages.COURT_NOT_FOUND });

        const statistic = court.statistics.find(
            (stat) => stat.id === Number(statisticId)
        );

        if (!statistic)
            return res
                .status(NOT_FOUND)
                .json({ message: CourtMessages.STATISTICS_NOT_FOUND });

        Object.assign(statistic, updatedData);
        await court.save();

        res.status(OK).json(court);
    } catch (error) {
        res.status(INTERNAL_ERROR).json({
            message: CourtMessages.UPDATE_STATISTICS_ERROR,
            error,
        });
    }
};

export const deleteCourt = async (
    req: Request,
    res: Response
): Promise<Response | any> => {
    const court = await courtService.deleteCourt(req.params.id);
    if (court) {
        res.status(OK).json({ message: CourtMessages.COURT_DELETED });
    } else {
        res.status(NOT_FOUND).json({ message: CourtMessages.COURT_NOT_FOUND });
    }
};

export const deleteStatisticById = async (
    req: Request,
    res: Response
): Promise<Response | any> => {
    const { courtId, statisticId } = req.params;

    try {
        const court = await courtService.getCourtById(courtId);
        if (!court)
            return res
                .status(NOT_FOUND)
                .json({ message: CourtMessages.COURT_NOT_FOUND });

        const statisticIndex = court.statistics.findIndex(
            (stat) => stat.id === Number(statisticId)
        );

        if (statisticIndex === -1)
            return res
                .status(NOT_FOUND)
                .json({ message: CourtMessages.STATISTICS_NOT_FOUND });

        court.statistics.splice(statisticIndex, 1);
        await court.save();

        res.status(OK).json(court);
    } catch (error) {
        res.status(INTERNAL_ERROR).json({
            message: CourtMessages.DELETE_STATISTICS_ERROR,
            error,
        });
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
        if (!court)
            return res
                .status(NOT_FOUND)
                .json({ message: CourtMessages.COURT_NOT_FOUND });

        court.statistics.push(newStatistic);
        await court.save();

        res.status(CREATED).json(court);
    } catch (error) {
        res.status(INTERNAL_ERROR).json({
            message: CourtMessages.ADD_STATISTICS_ERROR,
            error,
        });
    }
};
