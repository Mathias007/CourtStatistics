import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { getCourts } from "../../services/court.service";
import { Court } from "../../models/court.model";
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
} from "chart.js";

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
);

const ResolvedCasesComparisonChart: React.FC = () => {
    const [courts, setCourts] = useState<Court[]>([]);

    useEffect(() => {
        const fetchCourtsData = async () => {
            const data = await getCourts();
            setCourts(data);
        };

        fetchCourtsData();
    }, []);

    if (courts.length === 0) return <p>Wczytywanie danych...</p>;

    const years = courts[0].statistics.map((stat) => stat.year);
    const resolvedCasesData = courts.map((court) =>
        court.statistics.map((stat) => stat.resolved)
    );

    const data = {
        labels: years,
        datasets: courts.map((court, index) => ({
            label: court.court_name,
            data: resolvedCasesData[index].flat(),
            backgroundColor: `rgba(${(index * 50) % 255}, ${
                (index * 80) % 255
            }, ${(index * 100) % 255}, 0.6)`,
        })),
    };

    return (
        <div>
            <h2>Porównanie liczby załatwionych spraw</h2>
            <Bar data={data} />
        </div>
    );
};

export default ResolvedCasesComparisonChart;
