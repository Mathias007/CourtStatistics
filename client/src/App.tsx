import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import CourtList from "./components/court/CourtList";
import CourtForm from "./components/court/CourtForm";
import CourtDetails from "./components/court/CourtDetails";
import StatisticForm from "./components/court/StatisticForm";
import RegisterForm from "./components/user/RegisterForm";
import LoginForm from "./components/user/LoginForm";
import ProtectedRoute from "./components/general/ProtectedRoute";
import UserList from "./components/user/UserList";
import AddUserForm from "./components/user/AddUserForm";
import EditUserForm from "./components/user/EditUserForm";
import UserDetails from "./components/user/UserDetails";
import NotFound from "./components/general/NotFound";

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />

                    <Route path="/" element={<ProtectedRoute />}>
                        <Route path="/" element={<CourtList />} />
                        <Route path="/courts/add" element={<CourtForm />} />
                        <Route
                            path="/courts/edit/:id"
                            element={<CourtForm />}
                        />
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
                        <Route
                            path="/users/edit/:id"
                            element={<EditUserForm />}
                        />
                    </Route>

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
