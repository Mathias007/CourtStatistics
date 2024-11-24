import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserList, deleteUser } from "../../services/user.service";
import { User } from "../../models/user.model";
import LogoutButton from "./LogoutButton";
import ToggleSection from "../general/ToggleSection";

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            const data = await getUserList();
            setUsers(data);
        };
        fetchUsers();
    }, []);

    const handleDelete = async (userId: string) => {
        await deleteUser(userId);
        setUsers(users.filter((user) => user._id !== userId));
    };

    if (!users.length) return <p>Wczytywanie...</p>;

    return (
        <div className="dashboard-wrapper">
            <div className="dashboard-header">
                <h1>Lista użytkowników</h1>
                <LogoutButton />
            </div>
            <ToggleSection title="Tabela">
                <div className="table-buttons">
                    <button
                        className="form-button"
                        onClick={() => navigate("/users/add")}
                    >
                        Dodaj użytkownika
                    </button>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Imię i nazwisko</th>
                            <th>Email</th>
                            <th>Operacje</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="table-row">
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td className="table-actions">
                                    <button
                                        className="table-button"
                                        onClick={() =>
                                            navigate(`/users/${user._id}`)
                                        }
                                    >
                                        Zobacz
                                    </button>
                                    <button
                                        className="table-button"
                                        onClick={() =>
                                            navigate(`/users/edit/${user._id}`)
                                        }
                                    >
                                        Edytuj
                                    </button>
                                    <button
                                        className="table-button"
                                        onClick={() => handleDelete(user._id)}
                                    >
                                        Usuń
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </ToggleSection>
        </div>
    );
};

export default UserList;
