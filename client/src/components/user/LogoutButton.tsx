import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/user.service";

const LogoutButton: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return <button onClick={handleLogout}>Wyloguj się</button>;
};

export default LogoutButton;
