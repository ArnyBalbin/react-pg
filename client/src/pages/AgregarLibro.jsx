import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

export function AgregarLibro() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post('/api/libros', { titulo, autor });
      navigate('/');
    } catch (error) {
      console.error('Error al agregar libro:', error);
    }
  };

  return (
    <div>
      <h2>Agregar Libro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
        </div>
        <div>
          <label>Autor:</label>
          <input value={autor} onChange={(e) => setAutor(e.target.value)} required />
        </div>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}
