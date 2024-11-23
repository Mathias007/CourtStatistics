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

interface BarChartProps {
    courtId: string;
}

const BarChart: React.FC<BarChartProps> = ({ courtId }) => {
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
    const backlogStart = court.statistics.map((stat) => stat.backlog_start);
    const backlogEnd = court.statistics.map((stat) => stat.backlog_end);

    const data = {
        labels: years,
        datasets: [
            {
                label: "Zaległość wejściowa",
                data: backlogStart,
                backgroundColor: "rgba(255, 99, 132, 0.6)",
            },
            {
                label: "Zaległość wyjściowa",
                data: backlogEnd,
                backgroundColor: "rgba(54, 162, 235, 0.6)",
            },
        ],
    };

    return (
        <div>
            <h3>Zaległości wejściowe i wyjściowe</h3>
            <Bar data={data} />
        </div>
    );
};

export default BarChart;
