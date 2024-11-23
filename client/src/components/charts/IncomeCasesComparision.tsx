import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
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

interface IncomeCasesComparisionProps {
    courts: Court[];
}

const IncomeCasesComparision: React.FC<IncomeCasesComparisionProps> = ({
    courts,
}) => {
    const years = [
        ...new Set(
            courts.flatMap((court) => court.statistics.map((stat) => stat.year))
        ),
    ].sort();

    const [selectedYear, setSelectedYear] = useState<number | "all">("all");

    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedYear(value === "all" ? "all" : parseInt(value));
    };

    const filteredCourts =
        selectedYear === "all"
            ? courts
            : courts.map((court) => ({
                  ...court,
                  statistics: court.statistics.filter(
                      (stat) => stat.year === selectedYear
                  ),
              }));

    const groupedData = filteredCourts.map((court) => {
        const courtData = years.map((year) => {
            const statsForYear = court.statistics.filter(
                (stat) => stat.year === year
            );
            return {
                year,
                PENAL: statsForYear
                    .filter((stat) => stat.category === "PENAL")
                    .reduce((sum, stat) => sum + stat.incoming, 0),
                CIVIL: statsForYear
                    .filter((stat) => stat.category === "CIVIL")
                    .reduce((sum, stat) => sum + stat.incoming, 0),
                LABOR: statsForYear
                    .filter((stat) => stat.category === "LABOR")
                    .reduce((sum, stat) => sum + stat.incoming, 0),
            };
        });

        return { courtName: court.court_name, data: courtData };
    });

    const labels =
        selectedYear === "all"
            ? years.flatMap((year) =>
                  courts.map((court) => `${court.court_name} (${year})`)
              )
            : courts.map((court) => court.court_name);

    const datasets = ["PENAL", "CIVIL", "LABOR"].map((category, index) => ({
        label:
            category === "PENAL"
                ? "Prawo Karne"
                : category === "CIVIL"
                ? "Prawo Cywilne"
                : "Prawo Pracy",
        data:
            selectedYear === "all"
                ? groupedData.flatMap(({ data }) =>
                      data.map((yearData) => yearData[category])
                  )
                : groupedData.map(
                      ({ data }) =>
                          data.find((d) => d.year === selectedYear)?.[
                              category
                          ] || 0
                  ),
        backgroundColor: [
            "rgba(255, 99, 132, 0.7)",
            "rgba(54, 162, 235, 0.7)",
            "rgba(255, 206, 86, 0.7)",
        ][index],
    }));

    const data = {
        labels,
        datasets,
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: "top" as const },
            title: {
                display: true,
                text:
                    selectedYear === "all"
                        ? "Porównanie wpływu według kategorii (Wszystkie lata)"
                        : `Porównanie wpływu według kategorii (${selectedYear})`,
            },
        },
        scales: {
            x: { stacked: true },
            y: { stacked: true },
        },
    };

    return (
        <div>
            <h3>Porównanie wpływu w poszczególnych latach</h3>
            <div className="chart-filter">
                <label htmlFor="year-select">Wybierz rok: </label>
                <select
                    className="chart-select"
                    id="year-select"
                    onChange={handleYearChange}
                >
                    <option value="all">Wszystkie lata</option>
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>
            <Bar data={data} options={options} />
        </div>
    );
};

export default IncomeCasesComparision;
