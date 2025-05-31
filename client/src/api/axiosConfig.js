// src/api/axiosConfig.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://tu-backend-en-render.com'  // Reemplaza con tu URL de producción
    : 'http://localhost:3000',            // URL de desarrollo
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Si necesitas enviar cookies
});

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // El servidor respondió con un status fuera de 2xx
      console.error('Error de respuesta:', error.response.data);
    } else if (error.request) {
      // La petición fue hecha pero no se recibió respuesta
      console.error('No se recibió respuesta:', error.request);
    } else {
      // Error al configurar la petición
      console.error('Error de configuración:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api;