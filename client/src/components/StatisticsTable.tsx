import React, { useEffect, useState } from "react";
import { getStatistics, deleteStatistic } from "../services/court.service";
import { CourtStatistic } from "../models/court.model";

interface StatisticsTableProps {
    courtId: string;
    year: number;
    category: string;
}

const StatisticsTable: React.FC<StatisticsTableProps> = ({
    courtId,
    year,
    category,
}) => {
    const [statistics, setStatistics] = useState<CourtStatistic[]>([]);

    const fetchStatistics = async () => {
        const data = await getStatistics(courtId, year, category);
        setStatistics(data);
    };

    const handleDelete = async (statisticId: number) => {
        await deleteStatistic(courtId, statisticId);
        fetchStatistics();
    };

    useEffect(() => {
        fetchStatistics();
    }, [courtId, year, category]);

    return (
        <div>
            <h3>
                Statistics for {category} - {year}
            </h3>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Backlog Start</th>
                        <th>Incoming</th>
                        <th>Resolved</th>
                        <th>Backlog End</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {statistics.map((stat) => (
                        <tr key={stat.id}>
                            <td>{stat.id}</td>
                            <td>{stat.backlog_start}</td>
                            <td>{stat.incoming}</td>
                            <td>{stat.resolved}</td>
                            <td>{stat.backlog_end}</td>
                            <td>
                                <button onClick={() => handleDelete(stat.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StatisticsTable;
