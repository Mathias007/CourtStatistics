import React from "react";
import { Pie } from "react-chartjs-2";

import { CourtModel } from "../../models";

interface PieChartForCourtsProps {
    courts: CourtModel.Court[];
}

const PieChartForCourts: React.FC<PieChartForCourtsProps> = ({ courts }) => {
    const latestYearStats = courts.map((court) => {
        const latestYear = Math.max(
            ...court.statistics.map((stat) => stat.year)
        );
        const backlogForLatestYear = court.statistics
            .filter((stat) => stat.year === latestYear)
            .reduce((sum, stat) => sum + stat.backlog_end, 0);
        return { courtName: court.court_name, backlog: backlogForLatestYear };
    });

    const aggregateData = (key: "incoming" | "resolved") =>
        courts.map((court) => {
            const total = court.statistics.reduce(
                (sum, stat) => sum + stat[key],
                0
            );
            return { courtName: court.court_name, total };
        });

    const createDataset = (
        data: { courtName: string; total: number }[],
        label: string
    ) => ({
        labels: data.map((item) => item.courtName),
        datasets: [
            {
                label,
                data: data.map((item) => item.total),
                backgroundColor: data.map(
                    (_, index) =>
                        `rgba(${(index * 50) % 255}, ${(index * 100) % 255}, ${
                            (index * 150) % 255
                        }, 0.7)`
                ),
            },
        ],
    });

    const incomingData = aggregateData("incoming");
    const resolvedData = aggregateData("resolved");

    return (
        <div className="charts-wrapper">
            <div className="charts-group">
                <div className="pie-chart">
                    <h3>Łączny wpływ spraw</h3>
                    <Pie data={createDataset(incomingData, "Wpływ")} />
                </div>
                <div className="pie-chart">
                    <h3>Łączne załatwienia spraw</h3>
                    <Pie data={createDataset(resolvedData, "Załatwienia")} />
                </div>
            </div>
            <div className="pie-chart">
                <h3>
                    Stan zaległości po roku{" "}
                    {Math.max(...latestYearStats.map((s) => s.backlog))}
                </h3>
                <Pie
                    data={createDataset(
                        latestYearStats.map((stat) => ({
                            courtName: stat.courtName,
                            total: stat.backlog,
                        })),
                        `Zaległości`
                    )}
                />
            </div>
        </div>
    );
};

export default PieChartForCourts;
