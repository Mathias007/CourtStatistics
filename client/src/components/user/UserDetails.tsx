import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById } from "../../services/user.service";
import { User } from "../../models/user.model";

const UserDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            if (id) {
                const data = await getUserById(id);
                setUser(data);
            }
        };
        fetchUser();
    }, [id]);

    if (!user) return <p>Wczytywanie...</p>;

    return (
        <div className="form-wrapper">
            <h1>Szczegóły użytkownika</h1>
            <p>
                <strong>Imię i nazwisko:</strong> {user.username}
            </p>
            <p>
                <strong>Email:</strong> {user.email}
            </p>

            <div className="form-buttons-group">
                <button
                    className="form-button"
                    onClick={() => navigate(`/users/edit/${user._id}`)}
                >
                    Edytuj
                </button>
                <button
                    className="form-button form-button-cancel"
                    onClick={() => navigate("/users")}
                >
                    Wróć
                </button>
            </div>
        </div>
    );
};

export default UserDetails;
