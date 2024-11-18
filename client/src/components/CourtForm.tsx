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
        <div>
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
                    />
                </div>
                <div className="form-group">
                    <label>Adres</label>
                    <input
                        type="text"
                        className="form-input"
                        value={formData.court_address}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                court_address: e.target.value,
                            })
                        }
                    />
                </div>
                <button type="submit" className="form-button">
                    Zapisz
                </button>
            </form>
        </div>
    );
};

export default CourtForm;
