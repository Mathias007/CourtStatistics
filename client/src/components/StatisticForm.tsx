import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    addStatisticToCourt,
    updateStatistic,
    getCourtById,
} from "../services/court.service";

// interface StatisticFormProps {}

const StatisticForm: React.FC = () => {
    const { courtId, statId } = useParams<{
        courtId: string;
        statId?: string;
    }>();
    const [formData, setFormData] = useState({
        year: new Date().getFullYear(),
        category: "",
        backlog_start: 0,
        incoming: 0,
        resolved: 0,
        backlog_end: 0,
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourtData = async () => {
            if (courtId && statId) {
                const court = await getCourtById(courtId);
                const statistic = court.statistics.find(
                    (s) => s.id === Number(statId)
                );
                if (statistic) {
                    setFormData({
                        year: statistic.year,
                        category: statistic.category,
                        backlog_start: statistic.backlog_start,
                        incoming: statistic.incoming,
                        resolved: statistic.resolved,
                        backlog_end: statistic.backlog_end,
                    });
                }
            }
        };
        fetchCourtData();
    }, [courtId, statId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (courtId) {
            if (statId) {
                await updateStatistic(courtId, parseInt(statId), formData);
            } else {
                await addStatisticToCourt(courtId, formData);
            }
            navigate(`/courts/${courtId}`);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:
                name === "backlog_start" ||
                name === "incoming" ||
                name === "resolved" ||
                name === "backlog_end" ||
                name === "year"
                    ? parseInt(value)
                    : value,
        }));
    };

    return (
        <div>
            <h1>{statId ? "Edytuj statystykę" : "Dodaj nową statystykę"}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Rok</label>
                    <input
                        type="number"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Kategoria</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Wybierz kategorię</option>
                        <option value="PENAL">Karne</option>
                        <option value="CIVIL">Cywilne</option>
                        <option value="LABOR">Pracy</option>
                    </select>
                </div>
                <div>
                    <label>Zaległość wejściowa</label>
                    <input
                        type="number"
                        name="backlog_start"
                        value={formData.backlog_start}
                        onChange={handleChange}
                        required
                    />
                    <label>Wpływ</label>
                    <input
                        type="number"
                        name="incoming"
                        value={formData.incoming}
                        onChange={handleChange}
                        required
                    />
                    <label>Załatwienia</label>
                    <input
                        type="number"
                        name="resolved"
                        value={formData.resolved}
                        onChange={handleChange}
                        required
                    />
                    <label>Zaległość wyjściowa</label>
                    <input
                        type="number"
                        name="backlog_end"
                        value={formData.backlog_end}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">
                    {statId ? "Zatwierdź zmiany" : "Dodaj statystykę"}
                </button>
            </form>
            <button onClick={() => navigate(`/courts/${courtId}`)}>
                Anuluj
            </button>
        </div>
    );
};

export default StatisticForm;
