import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Court } from "../models/court.model";
import { getCourtById, deleteStatistic } from "../services/court.service";

import BarChart from "./charts/BarChart";
import CategoryChart from "./charts/CategoryChart";
import ResolvedCasesChart from "./charts/ResolvedCasesChart";
import ToggleSection from "./ToggleSection";

const CourtDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [court, setCourt] = useState<Court | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourt = async () => {
            if (id) {
                const data = await getCourtById(id);
                setCourt(data);
            }
        };
        fetchCourt();
    }, [id]);

    const handleDeleteStatistic = async (courtId: string, statId: number) => {
        if (court) {
            await deleteStatistic(courtId, statId);
            setCourt({
                ...court,
                statistics: court.statistics.filter(
                    (stat) => stat.id !== statId
                ),
            });
        }
    };

    if (!court) return <p>Wczytywanie...</p>;

    return (
        <div className="dashboard-wrapper">
            <h1>{court.court_name}</h1>
            <p>{court.court_address}</p>
            <ToggleSection title="Statystyki">
                <div className="table-buttons">
                    <button
                        onClick={() =>
                            navigate(`/courts/${court._id}/statistics/add`)
                        }
                        className="form-button"
                    >
                        Dodaj statystykę
                    </button>
                    <button
                        onClick={() => navigate("/")}
                        className="form-button"
                    >
                        Wróć
                    </button>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Rok</th>
                            <th>Kategoria spraw</th>
                            <th>Zaległość wejściowa</th>
                            <th>Wpływ</th>
                            <th>Załatwienia</th>
                            <th>Zaległość wyjściowa</th>
                            <th>Operacje</th>
                        </tr>
                    </thead>
                    <tbody>
                        {court.statistics.map((stat) => (
                            <tr key={stat.id} className="table-row">
                                <td>{stat.year}</td>
                                <td>
                                    {stat.category === "PENAL"
                                        ? "Prawo Karne"
                                        : stat.category === "CIVIL"
                                        ? "Prawo Cywilne"
                                        : stat.category === "LABOR"
                                        ? "Prawo Pracy"
                                        : "Nieznana"}
                                </td>
                                <td>{stat.backlog_start}</td>
                                <td>{stat.incoming}</td>
                                <td>{stat.resolved}</td>
                                <td>{stat.backlog_end}</td>
                                <td className="table-actions">
                                    <button
                                        className="table-button"
                                        onClick={() =>
                                            navigate(
                                                `/courts/${court._id}/statistics/edit/${stat.id}`
                                            )
                                        }
                                    >
                                        Edytuj
                                    </button>
                                    <button
                                        className="table-button"
                                        onClick={() =>
                                            handleDeleteStatistic(
                                                court._id,
                                                stat.id
                                            )
                                        }
                                    >
                                        Usuń
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </ToggleSection>
            <ToggleSection title="Wykresy">
                <div className="charts-section">
                    <BarChart courtId={court._id} />
                    <ResolvedCasesChart courtId={court._id} />
                    <CategoryChart courtId={court._id} />
                </div>
            </ToggleSection>
        </div>
    );
};

export default CourtDetails;
