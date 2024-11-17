import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    useNavigate,
} from "react-router-dom";
import CourtTable from "./components/CourtTable";
import CourtForm from "./components/CourtForm";

import {
    getCourts,
    createCourt,
    updateCourt,
    deleteCourt,
    getCourtById,
} from "./services/court.service";

import "./App.css";
import { Court } from "./models/court.model";

// Komponent do wyświetlania tabeli sądów
const CourtsList: React.FC = () => {
    const [courts, setCourts] = useState<Court[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadCourts();
    }, []);

    const loadCourts = async () => {
        try {
            const data = await getCourts();
            setCourts(data);
        } catch (error) {
            console.error("Error loading courts:", error);
        }
    };

    const handleEdit = (court: Court) => {
        navigate(`/edit/${court._id}`);
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteCourt(id);
            loadCourts();
        } catch (error) {
            console.error("Error deleting court:", error);
        }
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={() => navigate("/add")}>Add New Court</button>
            <CourtTable
                data={courts}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
};

// Komponent formularza do tworzenia i edytowania sądów
const CourtFormPage: React.FC<{ courtId?: string }> = ({ courtId }) => {
    const [editingCourt, setEditingCourt] = useState<Court | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (courtId) {
            // Załaduj dane sądu do edycji
            const fetchCourt = async () => {
                try {
                    const court = await getCourtById(courtId);
                    setEditingCourt(court);
                } catch (error) {
                    console.error("Error fetching court:", error);
                }
            };
            fetchCourt();
        }
    }, [courtId]);

    const handleSubmit = async (data: Court) => {
        try {
            if (editingCourt) {
                await updateCourt(editingCourt._id, data);
            } else {
                await createCourt(data);
            }
            navigate("/");
        } catch (error) {
            console.error("Error saving court:", error);
        }
    };

    return (
        <div>
            <h1>{editingCourt ? "Edit Court" : "Add New Court"}</h1>
            <CourtForm initialData={editingCourt} onSubmit={handleSubmit} />
        </div>
    );
};

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<CourtsList />} />
                <Route path="/add" element={<CourtFormPage />} />
                <Route path="/edit/:id" element={<CourtFormPage />} />
            </Routes>
        </Router>
    );
};

export default App;
