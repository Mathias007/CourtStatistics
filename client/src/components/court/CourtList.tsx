import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Court } from "../../models/court.model";
import { getCourts, deleteCourt } from "../../services/court.service";

import PieChartForCourts from "../charts/CourtsPieComparision";
import ToggleSection from "../general/ToggleSection";
import IncomeCasesComparision from "../charts/IncomeCasesComparision";
import ResolvedCasesComparison from "../charts/ResolvedCasesComparision";
import LogoutButton from "../user/LogoutButton";

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
        <div className="dashboard-wrapper">
            <div className="dashboard-header">
                <h1>Lista sądów</h1>
                <LogoutButton />
            </div>
            <ToggleSection title="Tabela">
                <div className="table-buttons">
                    <button
                        className="form-button"
                        onClick={() => navigate("/courts/add")}
                    >
                        Dodaj sąd
                    </button>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nazwa</th>
                            <th>Adres</th>
                            <th>Statystyki</th>
                            <th>Operacje</th>
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
                                            navigate(
                                                `/courts/edit/${court._id}`
                                            )
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
            </ToggleSection>
            <ToggleSection title="Wykresy">
                <div className="charts-section">
                    <IncomeCasesComparision courts={courts} />
                    <ResolvedCasesComparison courts={courts} />
                    <PieChartForCourts courts={courts} />
                </div>
            </ToggleSection>
        </div>
    );
};

export default CourtList;
