import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Court } from "../models/court.model";
import { getCourts, deleteCourt } from "../services/court.service";
import ComparativeBarChart from "./charts/ComparativeBarChart";
import ResolvedCasesComparisonChart from "./charts/ResolvedCasesComparisionChart";

const CourtList: React.FC = () => {
    const [courts, setCourts] = useState<Court[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourts = async () => {
            const data = await getCourts();
            setCourts(data);
        };
        fetchCourts();
    }, []);

    const handleDelete = async (courtId: string) => {
        await deleteCourt(courtId);
        setCourts(courts.filter((court) => court._id !== courtId));
    };

    if (!courts.length) return <p>Wczytywanie...</p>;

    return (
        <div>
            <h1>Lista sądów</h1>
            <button onClick={() => navigate("/courts/add")}>Dodaj sąd</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nazwa</th>
                        <th>Adres</th>
                        <th>Statystyki</th>
                        <th>Akcje</th>
                    </tr>
                </thead>
                <tbody>
                    {courts.map((court) => (
                        <tr key={court._id} className="table-row">
                            <td>{court.court_name}</td>
                            <td>{court.court_address}</td>
                            <td>{court.statistics.length}</td>
                            <td className="table-actions">
                                <button
                                    className="table-button"
                                    onClick={() =>
                                        navigate(`/courts/${court._id}`)
                                    }
                                >
                                    Zobacz
                                </button>
                                <button
                                    className="table-button"
                                    onClick={() =>
                                        navigate(`/courts/edit/${court._id}`)
                                    }
                                >
                                    Edytuj
                                </button>
                                <button
                                    className="table-button"
                                    onClick={() => handleDelete(court._id)}
                                >
                                    Usuń
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="comparative-chart">
                <ComparativeBarChart />
                <ResolvedCasesComparisonChart />
            </div>
        </div>
    );
};

export default CourtList;
