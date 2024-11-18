import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Court } from "../models/court.model";
import { getCourts, deleteCourt } from "../services/court.service";

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

    return (
        <div>
            <h1>Lista sądów</h1>
            <button onClick={() => navigate("/courts/add")}>Dodaj sąd</button>
            <table>
                <thead>
                    <tr>
                        <th>Nazwa</th>
                        {/* <th>Adres</th> */}
                        <th>Statystyki</th>
                        <th>Akcje</th>
                    </tr>
                </thead>
                <tbody>
                    {courts.map((court) => (
                        <tr key={court._id}>
                            <td>{court.court_name}</td>
                            {/* <td>{court.address}</td> */}
                            <td>{court.statistics.length}</td>
                            <td>
                                <button
                                    onClick={() =>
                                        navigate(`/courts/${court._id}`)
                                    }
                                >
                                    Zobacz
                                </button>
                                <button
                                    onClick={() =>
                                        navigate(`/courts/edit/${court._id}`)
                                    }
                                >
                                    Edytuj
                                </button>
                                <button onClick={() => deleteCourt(court._id)}>
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

export default CourtList;
