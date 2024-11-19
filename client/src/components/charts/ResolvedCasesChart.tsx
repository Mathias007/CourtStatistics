import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { getCourtById } from "../../services/court.service";
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

interface ResolvedCasesChartProps {
    courtId: string;
}

const ResolvedCasesChart: React.FC<ResolvedCasesChartProps> = ({ courtId }) => {
    const [court, setCourt] = useState<Court | null>(null);

    useEffect(() => {
        const fetchCourtData = async () => {
            const data = await getCourtById(courtId);
            setCourt(data);
        };

        fetchCourtData();
    }, [courtId]);

    if (!court) return <p>Wczytywanie danych...</p>;

    const years = court.statistics.map((stat) => stat.year);
    const resolvedCases = court.statistics.map((stat) => stat.resolved);

    const data = {
        labels: years,
        datasets: [
            {
                label: "Załatwione sprawy",
                data: resolvedCases,
                backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
        ],
    };

    return (
        <div>
            <h2>Załatwione sprawy</h2>
            <Bar data={data} />
        </div>
    );
};

export default ResolvedCasesChart;
