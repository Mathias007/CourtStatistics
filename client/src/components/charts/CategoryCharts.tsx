import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { CourtService } from "../../services";
import { CourtModel } from "../../models";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

interface CategoryChartsProps {
    courtId: string;
}

const CategoryCharts: React.FC<CategoryChartsProps> = ({ courtId }) => {
    const [court, setCourt] = useState<CourtModel.Court | null>(null);
    const [year, setYear] = useState<number | null>(null); // Wybrany rok

    useEffect(() => {
        const fetchCourtData = async () => {
            const data = await CourtService.getCourtById(courtId);
            setCourt(data);
            if (data.statistics.length > 0) {
                setYear(data.statistics[0].year); // Domyślnie pierwszy dostępny rok
            }
        };
        fetchCourtData();
    }, [courtId]);

    if (!court) return <p>Wczytywanie danych...</p>;

    const years = Array.from(
        new Set(court.statistics.map((stat) => stat.year))
    );
    const filteredStats = court.statistics.filter((stat) => stat.year === year);

    const generateChartData = (field: keyof CourtModel.Statistic) => {
        const categories = filteredStats.reduce((acc, stat) => {
            acc[stat.category] = (acc[stat.category] || 0) + (stat[field] || 0);
            return acc;
        }, {} as Record<string, number>);

        return {
            labels: Object.keys(categories),
            datasets: [
                {
                    data: Object.values(categories),
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.6)",
                        "rgba(54, 162, 235, 0.6)",
                        "rgba(255, 205, 86, 0.6)",
                    ],
                },
            ],
        };
    };

    return (
        <div>
            <h3>Rozkład spraw według kategorii</h3>
            <div className="chart-filter">
                <label htmlFor="year-select">Wybierz rok: </label>
                <select
                    className="chart-select"
                    id="year-select"
                    value={year || ""}
                    onChange={(e) => setYear(Number(e.target.value))}
                >
                    {years.map((yr) => (
                        <option key={yr} value={yr}>
                            {yr}
                        </option>
                    ))}
                </select>
            </div>
            <div className="charts-wrapper">
                <div className="charts-group">
                    <div className="pie-chart">
                        <h4>Wpływ</h4>
                        <Pie data={generateChartData("incoming")} />
                    </div>
                    <div className="pie-chart">
                        <h4>Załatwienia</h4>
                        <Pie data={generateChartData("resolved")} />
                    </div>
                    <div className="pie-chart">
                        <h4>Zaległości</h4>
                        <Pie data={generateChartData("backlog_start")} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryCharts;
