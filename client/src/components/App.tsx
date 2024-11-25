import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthContext } from "../context";

import { ProtectedRoute, NotFound } from "./general";
import { CourtList, CourtForm, CourtDetails, StatisticForm } from "./court";
import {
    RegisterForm,
    LoginForm,
    UserList,
    AddUserForm,
    EditUserForm,
    UserDetails,
} from "./user";

const { AuthProvider } = AuthContext;

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
