import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
} from "chart.js";
import { CourtService } from "../../services";
import { CourtModel } from "../../models";

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
    const [court, setCourt] = useState<CourtModel.Court | null>(null);
    const [year, setYear] = useState<number | null>(null);

    useEffect(() => {
        const fetchCourtData = async () => {
            const data = await CourtService.getCourtById(courtId);
            setCourt(data);
            if (data.statistics.length > 0) {
                setYear(data.statistics[0].year);
            }
        };
        fetchCourtData();
    }, [courtId]);

    if (!court) return <p>Wczytywanie danych...</p>;

    const years = Array.from(
        new Set(court.statistics.map((stat) => stat.year))
    );
    const filteredStats = court.statistics.filter((stat) => stat.year === year);

    const data = {
        labels: filteredStats.map((stat) =>
            stat.category === "PENAL"
                ? "Prawo Karne"
                : stat.category === "CIVIL"
                ? "Prawo Cywilne"
                : stat.category === "LABOR"
                ? "Prawo Pracy"
                : "Nieznane"
        ),
        datasets: [
            {
                label: "Zaległość wejściowa",
                data: filteredStats.map((stat) => stat.backlog_start),
                backgroundColor: "rgba(255, 99, 132, 0.6)",
            },
            {
                label: "Zaległość wyjściowa",
                data: filteredStats.map((stat) => stat.backlog_end),
                backgroundColor: "rgba(54, 162, 235, 0.6)",
            },
        ],
    };

    return (
        <div>
            <h3>Zaległości wejściowe i wyjściowe</h3>
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
            <Bar data={data} />
        </div>
    );
};

export default BarChart;
