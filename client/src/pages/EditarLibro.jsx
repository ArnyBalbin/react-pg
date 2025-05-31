import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

export function EditarLibro() {
  const { id } = useParams();
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/api/libros/${id}`)
      .then(res => {
        setTitulo(res.data.titulo);
        setAutor(res.data.autor);
      })
      .catch(err => console.error('Error al obtener libro:', err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/libros/${id}`, { titulo, autor });
      navigate('/');
    } catch (err) {
      console.error('Error al editar libro:', err);
    }
  };

  return (
    <div>
      <h2>Editar Libro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
        </div>
        <div>
          <label>Autor:</label>
          <input value={autor} onChange={(e) => setAutor(e.target.value)} required />
        </div>
        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
}
