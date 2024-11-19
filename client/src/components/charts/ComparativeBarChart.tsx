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

const ComparativeBarChart: React.FC = () => {
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
    const backlogStartData = courts.map((court) =>
        court.statistics.map((stat) => stat.backlog_start)
    );
    const backlogEndData = courts.map((court) =>
        court.statistics.map((stat) => stat.backlog_end)
    );

    const data = {
        labels: years,
        datasets: [
            ...courts.map((court, index) => ({
                label: `${court.court_name} - Wejściowe`,
                data: backlogStartData[index].flat(),
                backgroundColor: `rgba(${(index * 50) % 255}, ${
                    (index * 80) % 255
                }, ${(index * 100) % 255}, 0.6)`,
                borderColor: `rgba(${(index * 50) % 255}, ${
                    (index * 80) % 255
                }, ${(index * 100) % 255}, 1)`,
                borderWidth: 1,
            })),
            ...courts.map((court, index) => ({
                label: `${court.court_name} - Wyjściowe`,
                data: backlogEndData[index].flat(),
                backgroundColor: `rgba(${(index * 50 + 100) % 255}, ${
                    (index * 80 + 100) % 255
                }, ${(index * 100 + 100) % 255}, 0.6)`,
                borderColor: `rgba(${(index * 50 + 100) % 255}, ${
                    (index * 80 + 100) % 255
                }, ${(index * 100 + 100) % 255}, 1)`,
                borderWidth: 1,
            })),
        ],
    };

    return (
        <div>
            <h2>Porównanie zaległości wejściowych/wyjściowych</h2>
            <Bar data={data} />
        </div>
    );
};

export default ComparativeBarChart;
