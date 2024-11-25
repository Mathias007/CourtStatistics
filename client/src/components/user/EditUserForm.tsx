import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { UserService } from "../../services";
import { UserModel } from "../../models";
import { Loading } from "../general";

const EditUserForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<UserModel.User | null>(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            if (id) {
                const userData = await UserService.getUserById(id);
                setUser(userData);
                setUsername(userData.username);
                setEmail(userData.email);
            }
        };
        fetchUser();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (id) {
                await UserService.updateUser(id, { username, email });
                navigate("/users");
            }
        } catch (error) {
            console.error("Błąd edycji użytkownika:", error);
        }
    };

    if (!user) return <Loading />;

    return (
        <div className="form-wrapper">
            <h1>Edytuj użytkownika</h1>
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nazwa</label>
                    <input
                        type="text"
                        className="form-input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Adres email</label>
                    <input
                        type="email"
                        className="form-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-buttons-group">
                    <button type="submit">Zapisz zmiany</button>
                    <button
                        onClick={() => navigate("/users")}
                        className="form-button form-button-cancel"
                    >
                        Anuluj
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditUserForm;
