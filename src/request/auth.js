import axios from "axios";
const config = import.meta.env

const API = `http://${config.VITE_HOST}:${config.VITE_PORT_BACKEND}`;

export const registerRequest = user => axios.post(`${API}/auth/register`, user)

export const loginRequest = user => axios.post(`${API}/auth/login`, user)