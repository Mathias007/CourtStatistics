import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Court } from "../models/court.model";
import { getCourtById, deleteStatistic } from "../services/court.service";

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
        <div>
            <h1>{court.court_name}</h1>
            <p>Adres: {court.court_address}</p>
            <h2>Statystyki</h2>
            <button
                onClick={() => navigate(`/courts/${court._id}/statistics/add`)}
                className="form-button"
            >
                Dodaj statystykę
            </button>
            <button onClick={() => navigate("/")} className="form-button">
                Wróć
            </button>
            <table className="table">
                <thead>
                    <tr>
                        <th>Rok</th>
                        <th>Kategoria</th>
                        <th>Zaległość wejściowa</th>
                        <th>Wpływ</th>
                        <th>Załatwienia</th>
                        <th>Zaległość wyjściowa</th>
                        <th>Akcje</th>
                    </tr>
                </thead>
                <tbody>
                    {court.statistics.map((stat) => (
                        <tr key={stat.id} className="table-row">
                            <td>{stat.year}</td>
                            <td>{stat.category}</td>
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
        </div>
    );
};

export default CourtDetails;
