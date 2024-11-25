import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { CourtService } from "../../services";

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
                const court = await CourtService.getCourtById(courtId);
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
                await CourtService.updateStatistic(
                    courtId,
                    parseInt(statId),
                    formData
                );
            } else {
                await CourtService.addStatisticToCourt(courtId, formData);
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
        <div className="form-wrapper">
            <h1>{statId ? "Edytuj statystykę" : "Dodaj nową statystykę"}</h1>
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Rok</label>
                    <input
                        type="number"
                        name="year"
                        className="form-input"
                        value={formData.year}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Kategoria spraw</label>
                    <select
                        name="category"
                        className="form-input"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Wybierz kategorię</option>
                        <option value="PENAL">Prawo Karne</option>
                        <option value="CIVIL">Prawo Cywilne</option>
                        <option value="LABOR">Prawo Pracy</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Zaległość wejściowa</label>
                    <input
                        type="number"
                        name="backlog_start"
                        className="form-input"
                        value={formData.backlog_start}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Wpływ</label>
                    <input
                        type="number"
                        name="incoming"
                        className="form-input"
                        value={formData.incoming}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Załatwienia</label>
                    <input
                        type="number"
                        name="resolved"
                        className="form-input"
                        value={formData.resolved}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Zaległość wyjściowa</label>
                    <input
                        type="number"
                        name="backlog_end"
                        className="form-input"
                        value={formData.backlog_end}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-buttons-group">
                    <button type="submit" className="form-button">
                        {statId ? "Zatwierdź zmiany" : "Dodaj statystykę"}
                    </button>
                    <button
                        onClick={() => navigate(`/courts/${courtId}`)}
                        className="form-button form-button-cancel"
                    >
                        Anuluj
                    </button>
                </div>
            </form>
        </div>
    );
};

export default StatisticForm;
