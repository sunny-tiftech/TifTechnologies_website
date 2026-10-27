import axios from "axios";

const API_BASE = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const submitEnquiry = (payload) => axios.post(`${API_BASE}/contact`, payload);
