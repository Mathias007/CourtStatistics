import axios from "axios";
import { User, UserInput } from "../models/user.model";

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const logout = () => {
    localStorage.removeItem("token");
};

export const login = async (
    email: string,
    password: string
): Promise<string> => {
    const response = await axios.post(`${API_BASE_URL}/users/login`, {
        email,
        password,
    });
    return response.data.token;
};

export const register = async (user: UserInput): Promise<User> => {
    const response = await axios.post(`${API_BASE_URL}/users/register`, user);
    return response.data;
};

export const getUserList = async (): Promise<User[]> => {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
};

export const getUserById = async (id: string): Promise<User> => {
    const response = await axios.get(`${API_BASE_URL}/users/${id}`);
    return response.data;
};

export const updateUser = async (
    id: string,
    updatedData: Partial<User>
): Promise<User> => {
    const response = await axios.put(
        `${API_BASE_URL}/users/${id}`,
        updatedData
    );
    return response.data;
};

export const deleteUser = async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/users/${id}`);
};
