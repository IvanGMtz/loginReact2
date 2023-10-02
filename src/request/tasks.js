import axios from "./axios";

export const getTasksRequest = async () => axios.get("/task");

export const createTaskRequest = async (task) => axios.post("/task", task);

export const updateTaskRequest = async (task) =>
    axios.put(`/task/${task._id}`, task);

export const deleteTaskRequest = async (id) => axios.delete(`/task/${id}`);

export const getTaskRequest = async (id) => axios.get(`/task/${id}`);