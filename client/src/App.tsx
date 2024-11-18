import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";

import CourtList from "./components/CourtList";
import CourtForm from "./components/CourtForm";
import CourtDetails from "./components/CourtDetails";
import StatisticForm from "./components/StatisticForm";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
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
            </Routes>
        </Router>
    );
};

export default App;
