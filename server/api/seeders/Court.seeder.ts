import { Court, CourtDocument } from "../models/Court.model";

import { DatabaseMessages } from "../../config/ServerMessages";

const sampleCourts: CourtDocument[] = [
    {
        court_name: "Sąd Apelacyjny w Katowicach",
        court_address: "al. Wojciecha Korfantego 117/119, 40-156 Katowice",
        statistics: [
            {
                id: 1,
                year: 2023,
                category: "PENAL",
                backlog_start: 100,
                incoming: 200,
                resolved: 180,
                backlog_end: 120,
            },
            {
                id: 2,
                year: 2023,
                category: "CIVIL",
                backlog_start: 50,
                incoming: 120,
                resolved: 110,
                backlog_end: 60,
            },
            {
                id: 3,
                year: 2022,
                category: "PENAL",
                backlog_start: 80,
                incoming: 150,
                resolved: 130,
                backlog_end: 100,
            },
        ],
    },
    {
        court_name: "Sąd Apelacyjny w Krakowie",
        court_address: "Przy Rondzie 3, 31-547 Kraków",
        statistics: [
            {
                id: 1,
                year: 2023,
                category: "LABOR",
                backlog_start: 30,
                incoming: 90,
                resolved: 70,
                backlog_end: 50,
            },
        ],
    },
] as CourtDocument[];

export const seedCourtCollection = async () => {
    try {
        const existingCourts = await Court.find();

        if (existingCourts.length === 0) {
            console.log(DatabaseMessages.COURT_SEED_EMPTY);
            await Court.insertMany(sampleCourts);
            console.log(DatabaseMessages.COURT_SEED_FILLED);
        } else {
            console.log(DatabaseMessages.COURT_SEED_UNNECESSARY);
        }
    } catch (error) {
        console.error(DatabaseMessages.COURT_SEED_ERROR, error);
    }
};
