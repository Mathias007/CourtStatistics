import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "";
const COURTS_URL = `${API_URL}/courts`;

export const fetchCourts = async () => {
    const response = await axios.get(COURTS_URL);
    return response.data;
};

export const addCourt = async (court: any) => {
    const response = await axios.post(COURTS_URL, court);
    return response.data;
};

export const updateCourt = async (id: string, updatedCourt: any) => {
    const response = await axios.put(`${COURTS_URL}/${id}`, updatedCourt);
    return response.data;
};

export const deleteCourt = async (id: string) => {
    const response = await axios.delete(`${COURTS_URL}/${id}`);
    return response.data;
};
