import React, { useState } from "react";
import StatisticsTable from "../components/StatisticsTable";
import AddStatisticForm from "../components/AddStatisticsForm";

const Dashboard: React.FC = () => {
    const [courtId, setCourtId] = useState("1");
    const [year, setYear] = useState(2023);
    const [category, setCategory] = useState("PENAL");

    const refreshStatistics = () => {
        // Logika do odświeżania tabeli
    };

    return (
        <div>
            <h1>Court Statistics Dashboard</h1>
            <div>
                <label>Court ID:</label>
                <input
                    type="text"
                    value={courtId}
                    onChange={(e) => setCourtId(e.target.value)}
                />
            </div>
            <div>
                <label>Year:</label>
                <input
                    type="number"
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                />
            </div>
            <div>
                <label>Category:</label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="PENAL">Penal</option>
                    <option value="CIVIL">Civil</option>
                    <option value="LABOR">Labor</option>
                </select>
            </div>
            <StatisticsTable
                courtId={courtId}
                year={year}
                category={category}
            />
            <AddStatisticForm
                courtId={courtId}
                onStatisticAdded={refreshStatistics}
            />
        </div>
    );
};

export default Dashboard;
