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

    const groupedData = court.statistics.reduce((acc, stat) => {
        if (!acc[stat.year]) {
            acc[stat.year] = { PENAL: 0, CIVIL: 0, LABOR: 0 };
        }
        acc[stat.year][stat.category] += stat.resolved;
        return acc;
    }, {} as Record<number, { PENAL: number; CIVIL: number; LABOR: number }>);

    const years = Object.keys(groupedData).map((year) => parseInt(year, 10));
    const datasets = [
        {
            label: "Prawo Karne",
            data: years.map((year) => groupedData[year]?.PENAL || 0),
            backgroundColor: "rgba(255, 99, 132, 0.6)",
        },
        {
            label: "Prawo Cywilne",
            data: years.map((year) => groupedData[year]?.CIVIL || 0),
            backgroundColor: "rgba(54, 162, 235, 0.6)",
        },
        {
            label: "Prawo Pracy",
            data: years.map((year) => groupedData[year]?.LABOR || 0),
            backgroundColor: "rgba(255, 206, 86, 0.6)",
        },
    ];

    const data = {
        labels: years,
        datasets,
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: "Załatwione sprawy w podziale na kategorie",
            },
        },
    };

    return (
        <div>
            <h3>Załatwione sprawy</h3>
            <Bar data={data} options={options} />
        </div>
    );
};

export default ResolvedCasesChart;
