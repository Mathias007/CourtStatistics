import axios from "axios";

import { CourtModel } from "../models";

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const getCourts = async (): Promise<CourtModel.Court[]> => {
    const response = await axios.get(`${API_BASE_URL}/courts`);
    return response.data;
};

export const getCourtById = async (id: string): Promise<CourtModel.Court> => {
    const response = await axios.get(`${API_BASE_URL}/courts/${id}`);
    return response.data;
};

export const createCourt = async (
    court: Partial<CourtModel.Court>
): Promise<CourtModel.Court> => {
    const response = await axios.post(`${API_BASE_URL}/courts`, court);
    return response.data;
};

export const updateCourt = async (
    id: string,
    court: Partial<CourtModel.Court>
): Promise<CourtModel.Court> => {
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
): Promise<CourtModel.CourtStatistic[]> => {
    const response = await axios.get(
        `${API_BASE_URL}/courts/${courtId}/statistics/${year}/${category}`
    );
    return response.data;
};

export const addStatisticToCourt = async (
    courtId: string,
    statistic: Partial<CourtModel.CourtStatistic>
): Promise<CourtModel.Court> => {
    const response = await axios.post(
        `${API_BASE_URL}/courts/${courtId}/statistics`,
        statistic
    );
    return response.data;
};

export const updateStatistic = async (
    courtId: string,
    statisticId: number,
    statistic: Partial<CourtModel.CourtStatistic>
): Promise<CourtModel.Court> => {
    const response = await axios.put(
        `${API_BASE_URL}/courts/${courtId}/statistics/${statisticId}`,
        statistic
    );
    return response.data;
};

export const deleteStatistic = async (
    courtId: string,
    statisticId: number
): Promise<CourtModel.Court> => {
    const response = await axios.delete(
        `${API_BASE_URL}/courts/${courtId}/statistics/${statisticId}`
    );
    return response.data;
};
