import axios from "axios";
import { Court, CourtStatistic } from "../models/court.model";

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const getCourts = async (): Promise<Court[]> => {
    const response = await axios.get(`${API_BASE_URL}/courts`);
    return response.data;
};

export const getCourtById = async (id: string): Promise<Court> => {
    const response = await axios.get(`${API_BASE_URL}/courts/${id}`);
    return response.data;
};

export const createCourt = async (court: Partial<Court>): Promise<Court> => {
    const response = await axios.post(`${API_BASE_URL}/courts`, court);
    return response.data;
};

export const updateCourt = async (
    id: string,
    court: Partial<Court>
): Promise<Court> => {
    const response = await axios.put(`${API_BASE_URL}/courts/${id}`, court);
    return response.data;
};

export const deleteCourt = async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/courts/${id}`);
};

export const getStatistics = async (
    courtId: string,
    year: number,
    category: string
): Promise<CourtStatistic[]> => {
    const response = await axios.get(
        `${API_BASE_URL}/courts/${courtId}/statistics/${year}/${category}`
    );
    return response.data;
};

export const addStatisticToCourt = async (
    courtId: string,
    statistic: Partial<CourtStatistic>
): Promise<Court> => {
    const response = await axios.post(
        `${API_BASE_URL}/courts/${courtId}/statistics`,
        statistic
    );
    return response.data;
};

export const updateStatistic = async (
    courtId: string,
    statisticId: number,
    statistic: Partial<CourtStatistic>
): Promise<Court> => {
    const response = await axios.put(
        `${API_BASE_URL}/courts/${courtId}/statistics/${statisticId}`,
        statistic
    );
    return response.data;
};

export const deleteStatistic = async (
    courtId: string,
    statisticId: number
): Promise<Court> => {
    const response = await axios.delete(
        `${API_BASE_URL}/courts/${courtId}/statistics/${statisticId}`
    );
    return response.data;
};
