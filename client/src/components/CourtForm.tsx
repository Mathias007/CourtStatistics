import React, { useState } from "react";
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
        // address: ""
    });
    const navigate = useNavigate();

    React.useEffect(() => {
        if (id) {
            const fetchData = async () => {
                const court = await getCourtById(id);
                setFormData({
                    court_name: court.court_name,
                    // address: court.address
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
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nazwa</label>
                <input
                    type="text"
                    value={formData.court_name}
                    onChange={(e) =>
                        setFormData({ ...formData, court_name: e.target.value })
                    }
                />
            </div>
            {/* <div>
                <label>Address</label>
                <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
            </div> */}
            <button type="submit">Zapisz</button>
        </form>
    );
};

export default CourtForm;
