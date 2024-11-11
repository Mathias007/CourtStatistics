import React, { useState, useEffect } from "react";
import CourtTable from "./components/CourtTable";
import CourtForm from "./components/CourtForm";
import Modal from "./components/Modal";
import {
    fetchCourts,
    addCourt,
    updateCourt,
    deleteCourt,
} from "./services/api";

import "./App.css";

const App: React.FC = () => {
    const [courts, setCourts] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [editingCourt, setEditingCourt] = useState<any>(null);

    useEffect(() => {
        loadCourts();
    }, []);

    const loadCourts = async () => {
        const data = await fetchCourts();
        setCourts(data);
    };

    const handleAdd = () => {
        setEditingCourt(null);
        setModalOpen(true);
    };

    const handleEdit = (court: any) => {
        setEditingCourt(court);
        setModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        await deleteCourt(id);
        loadCourts();
    };

    const handleSubmit = async (data: any) => {
        if (editingCourt) {
            await updateCourt(editingCourt._id, data);
        } else {
            await addCourt(data);
        }
        setModalOpen(false);
        loadCourts();
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleAdd}>Add New Court</button>
            <CourtTable
                data={courts}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <CourtForm initialData={editingCourt} onSubmit={handleSubmit} />
            </Modal>
        </div>
    );
};

export default App;
