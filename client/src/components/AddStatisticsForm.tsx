import React, { useState } from "react";
import { addStatisticToCourt } from "../services/court.service";

interface AddStatisticFormProps {
    courtId: string;
    onStatisticAdded: () => void;
}

const AddStatisticForm: React.FC<AddStatisticFormProps> = ({
    courtId,
    onStatisticAdded,
}) => {
    const [formData, setFormData] = useState({
        year: "",
        category: "",
        backlog_start: "",
        incoming: "",
        resolved: "",
        backlog_end: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await addStatisticToCourt(courtId, {
            ...formData,
            category: formData.category,
            year: Number(formData.year),
            backlog_start: Number(formData.backlog_start),
            incoming: Number(formData.incoming),
            resolved: Number(formData.resolved),
            backlog_end: Number(formData.backlog_end),
        });
        onStatisticAdded();
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Add Statistic</h3>
            <div>
                <label>Year:</label>
                <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Category:</label>
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select</option>
                    <option value="PENAL">Penal</option>
                    <option value="CIVIL">Civil</option>
                    <option value="LABOR">Labor</option>
                </select>
            </div>
            <div>
                <label>Backlog Start:</label>
                <input
                    type="number"
                    name="backlog_start"
                    value={formData.backlog_start}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Incoming:</label>
                <input
                    type="number"
                    name="incoming"
                    value={formData.incoming}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Resolved:</label>
                <input
                    type="number"
                    name="resolved"
                    value={formData.resolved}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Backlog End:</label>
                <input
                    type="number"
                    name="backlog_end"
                    value={formData.backlog_end}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Add</button>
        </form>
    );
};

export default AddStatisticForm;
