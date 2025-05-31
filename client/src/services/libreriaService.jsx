import axios from "axios";
const API = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});

export const obtenerEditoriales = () => axios.get(`${API}/api/editoriales`);
export const obtenerLibros = () => axios.get(`${API}/api/libros`);
export const obtenerLibroPorId = (id) => axios.get(`${API}/api/libros/${id}`);
export const crearEditorial = (data) => axios.post(`${API}/api/editoriales`, data);
export const crearLibro = (data) => axios.post(`${API}/api/libros`, data);
export const actualizarLibro = (id, data) => api.put(`${API}/api/libros/${id}`, data);
export const eliminarLibro = (id) => axios.delete(`${API}/api/libros/${id}`);
export const eliminarEditorial = (id) => axios.delete(`${API}/api/editoriales/${id}`);