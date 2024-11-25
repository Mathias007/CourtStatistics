import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { UserService } from "../../services";

const AddUserForm: React.FC = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await UserService.register({ username, email, password });
            navigate("/users");
        } catch (error) {
            console.error("Błąd dodawania użytkownika:", error);
        }
    };

    return (
        <div className="form-wrapper">
            <h1>Dodaj użytkownika</h1>
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nazwa</label>
                    <input
                        type="text"
                        className="form-input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Nazwa użytkownika"
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
                        placeholder="Adres email"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Hasło</label>
                    <input
                        type="password"
                        className="form-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Hasło"
                        required
                    />
                </div>
                <div className="form-buttons-group">
                    <button type="submit">Dodaj użytkownika</button>
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

export default AddUserForm;
