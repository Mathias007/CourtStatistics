import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale,
    LinearScale,
} from "chart.js";

import { CourtService } from "../../services";
import { CourtModel } from "../../models";

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale,
    LinearScale
);

interface CategoryChartProps {
    courtId: string;
}

const CategoryChart: React.FC<CategoryChartProps> = ({ courtId }) => {
    const [court, setCourt] = useState<CourtModel.Court | null>(null);

    useEffect(() => {
        const fetchCourtData = async () => {
            const data = await CourtService.getCourtById(courtId);
            setCourt(data);
        };

        fetchCourtData();
    }, [courtId]);

    if (!court) return <p>Wczytywanie danych...</p>;

    const categories = court.statistics.reduce((acc, stat) => {
        acc[stat.category] = (acc[stat.category] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const data = {
        labels: Object.keys(categories),
        datasets: [
            {
                label: "",
                data: Object.values(categories),
                backgroundColor: [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 205, 86, 0.6)",
                ],
            },
        ],
    };

    return (
        <div>
            <h3>Rozkład spraw według kategorii</h3>
            <Pie data={data} />
        </div>
    );
};

export default CategoryChart;
