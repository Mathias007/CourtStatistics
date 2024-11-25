import React from "react";
import { useNavigate } from "react-router-dom";

import { UserService } from "../../services";

const LogoutButton: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        UserService.logout();
        navigate("/login");
    };

    return <button onClick={handleLogout}>Wyloguj się</button>;
};

export default LogoutButton;
