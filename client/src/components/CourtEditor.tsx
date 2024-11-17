import React, { useState } from "react";
import { updateCourt, addStatisticToCourt } from "../services/court.service";
import { Court, CourtStatistic } from "../models/court.model";

interface Props {
    court: Court;
}

const CourtEditor: React.FC<Props> = ({ court }) => {
    const [name, setName] = useState(court.court_name);
    const [newStatistic, setNewStatistic] = useState<Partial<CourtStatistic>>({
        category: "",
        backlog_start: 0,
        incoming: 0,
        resolved: 0,
        backlog_end: 0,
    });

    const handleUpdateCourt = async () => {
        await updateCourt(court._id, { court_name: name });
        alert("Court updated!");
    };

    const handleAddStatistic = async () => {
        await addStatisticToCourt(court._id, newStatistic);
        alert("Statistic added!");
    };

    return (
        <div>
            <h2>Edit Court: {court.court_name}</h2>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button onClick={handleUpdateCourt}>Update Name</button>

            <h3>Add Statistic</h3>
            <input
                type="text"
                placeholder="Category"
                value={newStatistic.category}
                onChange={(e) =>
                    setNewStatistic({
                        ...newStatistic,
                        category: e.target.value,
                    })
                }
            />
            <input
                type="number"
                placeholder="Incoming Backlog"
                value={newStatistic.backlog_start || 0}
                onChange={(e) =>
                    setNewStatistic({
                        ...newStatistic,
                        backlog_start: Number(e.target.value),
                    })
                }
            />
            {/* Dodaj więcej pól */}
            <button onClick={handleAddStatistic}>Add Statistic</button>
        </div>
    );
};

export default CourtEditor;
