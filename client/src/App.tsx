import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import CourtList from "./components/CourtList";
import CourtForm from "./components/CourtForm";
import CourtDetails from "./components/CourtDetails";
import StatisticForm from "./components/StatisticForm";

import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import ProtectedRoute from "./components/ProtectedRoute";
import UserList from "./components/UserList";
import AddUserForm from "./components/AddUserForm";
import EditUserForm from "./components/EditUserForm";
import UserDetails from "./components/UserDetails";

const App: React.FC = () => {
    const isAuthenticated = !!localStorage.getItem("token");

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />

                <Route
                    path="/"
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated} />
                    }
                >
                    <Route path="/" element={<CourtList />} />
                    <Route path="/courts/add" element={<CourtForm />} />
                    <Route path="/courts/edit/:id" element={<CourtForm />} />
                    <Route path="/courts/:id" element={<CourtDetails />} />
                    <Route
                        path="/courts/:courtId/statistics/add"
                        element={<StatisticForm />}
                    />
                    <Route
                        path="/courts/:courtId/statistics/edit/:statId"
                        element={<StatisticForm />}
                    />
                    <Route path="/users" element={<UserList />} />
                    <Route path="/users/add" element={<AddUserForm />} />
                    <Route path="/users/:id" element={<UserDetails />} />
                    <Route path="/users/edit/:id" element={<EditUserForm />} />
                </Route>

                <Route path="*" element={<h1>404 - Strona nie istnieje</h1>} />
            </Routes>
        </Router>
    );
};

export default App;
