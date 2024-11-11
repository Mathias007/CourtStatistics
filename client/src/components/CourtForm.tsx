import React, { useState, useEffect } from "react";

interface CourtFormProps {
    initialData?: any;
    onSubmit: (data: any) => void;
}

const CourtForm: React.FC<CourtFormProps> = ({ initialData, onSubmit }) => {
    const [formData, setFormData] = useState({
        court_name: "",
        statistics: [],
    });

    useEffect(() => {
        if (initialData) setFormData(initialData);
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Court Name:
                <input
                    type="text"
                    name="court_name"
                    value={formData.court_name}
                    onChange={handleChange}
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};

export default CourtForm;
