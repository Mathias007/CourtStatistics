import React, { useEffect, useState } from "react";
import { getCourts } from "../services/court.service";
import { Court } from "../models/court.model";

const CourtList: React.FC = () => {
    const [courts, setCourts] = useState<Court[]>([]);

    useEffect(() => {
        const fetchCourts = async () => {
            const data = await getCourts();
            setCourts(data);
        };

        fetchCourts();
    }, []);

    return (
        <div>
            <h1>Courts</h1>
            <ul>
                {courts.map((court) => (
                    <li key={court._id}>
                        {court.court_name} - {court.statistics.length}{" "}
                        statistics
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CourtList;
