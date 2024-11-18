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
                Statystyki spraw kategorii {category} za rok {year}
            </h3>
            <table>
                <thead>
                    <tr>
                        <th>Zaległość wejściowa</th>
                        <th>Wpływ</th>
                        <th>Załatwienia</th>
                        <th>Zaległość wyjściowa</th>
                        <th>Akcje</th>
                    </tr>
                </thead>
                <tbody>
                    {statistics.map((stat) => (
                        <tr key={stat.id}>
                            <td>{stat.backlog_start}</td>
                            <td>{stat.incoming}</td>
                            <td>{stat.resolved}</td>
                            <td>{stat.backlog_end}</td>
                            <td>
                                <button onClick={() => handleDelete(stat.id)}>
                                    Usuń
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
