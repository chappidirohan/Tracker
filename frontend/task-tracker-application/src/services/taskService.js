import axios from "axios";

const API_URL = "http://localhost:9095/api/tasks";

export const getAllTasks = () => axios.get(`${API_URL}/getAllTasks`);

export const createTask = (task) => axios.post(`${API_URL}/createTask`, task);

export const updateTask = (id, task) => axios.put(`${API_URL}/updateTask/${id}`, task);

export const deleteTask = (id) => axios.delete(`${API_URL}/deleteTask/${id}`);