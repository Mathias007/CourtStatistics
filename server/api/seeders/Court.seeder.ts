import Court, { CourtDocument } from "../models/Court.model";

const sampleCourts: CourtDocument[] = [
    {
        court_name: "SA Katowice",
        statistics: [
            {
                year: 2023,
                cases: [
                    {
                        category: "PENAL",
                        incoming_backlog: 100,
                        inflow: 200,
                        resolved: 180,
                        outgoing_backlog: 120,
                    },
                    {
                        category: "CIVIL",
                        incoming_backlog: 50,
                        inflow: 120,
                        resolved: 110,
                        outgoing_backlog: 60,
                    },
                ],
            },
            {
                year: 2022,
                cases: [
                    {
                        category: "PENAL",
                        incoming_backlog: 80,
                        inflow: 150,
                        resolved: 130,
                        outgoing_backlog: 100,
                    },
                ],
            },
        ],
    },
    {
        court_name: "SA Kraków",
        statistics: [
            {
                year: 2023,
                cases: [
                    {
                        category: "LABOR",
                        incoming_backlog: 30,
                        inflow: 90,
                        resolved: 70,
                        outgoing_backlog: 50,
                    },
                ],
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
