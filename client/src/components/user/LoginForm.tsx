import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/user.service";
import { useAuth } from "../../context/AuthContext";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setIsAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = await login(email, password);
            localStorage.setItem("token", token);
            setIsAuthenticated(true);
            navigate("/");
        } catch (error) {
            console.error("Błąd logowania:", error);
        }
    };

    return (
        <div className="form-wrapper">
            <h1>Logowanie</h1>
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Adres email</label>
                    <input
                        type="email"
                        className="form-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
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
                <button type="submit">Zaloguj</button>
            </form>
        </div>
    );
};

export default LoginForm;
