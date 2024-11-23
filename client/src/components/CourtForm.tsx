import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    createCourt,
    updateCourt,
    getCourtById,
} from "../services/court.service";

const CourtForm: React.FC = () => {
    const { id } = useParams<{ id?: string }>();
    const [formData, setFormData] = useState({
        court_name: "",
        court_address: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                const court = await getCourtById(id);
                setFormData({
                    court_name: court.court_name,
                    court_address: court.court_address,
                });
            };
            fetchData();
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (id) {
            await updateCourt(id, formData);
        } else {
            await createCourt(formData);
        }
        navigate("/");
    };

    return (
        <div className="form-wrapper">
            <h1>{id ? "Edytuj sąd" : "Dodaj sąd"}</h1>
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nazwa</label>
                    <input
                        type="text"
                        className="form-input"
                        value={formData.court_name}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                court_name: e.target.value,
                            })
                        }
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Adres</label>
                    <textarea
                        className="form-input"
                        value={formData.court_address}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                court_address: e.target.value,
                            })
                        }
                        required
                    />
                </div>
                <div className="form-buttons-group">
                    <button type="submit" className="form-button">
                        {id ? "Zatwierdź zmiany" : "Dodaj sąd"}
                    </button>
                    <button
                        onClick={() => navigate("/")}
                        className="form-button form-button-cancel"
                    >
                        Anuluj
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CourtForm;
