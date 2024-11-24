import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/user.service";

const RegisterForm = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await register({ username, email, password });
            navigate("/login");
        } catch (error) {
            console.error("Błąd rejestracji:", error);
        }
    };

    return (
        <div className="form-wrapper">
            <h1>Rejestracja</h1>
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
                <button type="submit">Zarejestruj</button>
            </form>
        </div>
    );
};

export default RegisterForm;
