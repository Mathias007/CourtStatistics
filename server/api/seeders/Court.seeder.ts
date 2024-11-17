import { Court, CourtDocument } from "../models/Court.model";

const sampleCourts: CourtDocument[] = [
    {
        court_name: "SA Katowice",
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
        court_name: "SA Kraków",
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

export const seedDatabase = async () => {
    try {
        const existingCourts = await Court.find();

        if (existingCourts.length === 0) {
            console.log(
                "Baza danych jest pusta. Inicjalizowanie przykładowymi danymi..."
            );
            await Court.insertMany(sampleCourts);
            console.log("Baza danych została wypełniona przykładowymi danymi.");
        } else {
            console.log(
                "Baza danych już zawiera dane, seeding nie jest potrzebny."
            );
        }
    } catch (error) {
        console.error("Błąd podczas inicjalizacji bazy danych:", error);
    }
};
