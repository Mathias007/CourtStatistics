import React from "react";
import { Court, CourtStatistic } from "../models/court.model";

interface CourtTableProps {
    data: Court[];
    onEdit: (court: Court) => void;
    onDelete: (id: string) => void;
}

const CourtTable: React.FC<CourtTableProps> = ({ data, onEdit, onDelete }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Nazwa Sądu</th>
                    <th>Rok Statystyczny</th>
                    <th>Kategoria Spraw</th>
                    <th>Akcje</th>
                </tr>
            </thead>
            <tbody>
                {data.map((court) => (
                    <tr key={court._id}>
                        <td>{court.court_name}</td>
                        <td>
                            {court.statistics && court.statistics.length > 0
                                ? court.statistics
                                      .map((stat: CourtStatistic) => stat.year)
                                      .join(", ")
                                : "Brak danych"}
                        </td>
                        <td>
                            {court.statistics && court.statistics.length > 0
                                ? court.statistics
                                      .map((stat: CourtStatistic) =>
                                          stat.category === "CIVIL"
                                              ? "Cywilne"
                                              : stat.category === "PENAL"
                                              ? "Karne"
                                              : stat.category === "LABOR"
                                              ? "Pracy"
                                              : "Inne"
                                      )
                                      .join(", ")
                                : "Brak danych"}
                        </td>
                        <td>
                            <button onClick={() => onEdit(court)}>Edit</button>
                            <button onClick={() => onDelete(court._id)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CourtTable;
