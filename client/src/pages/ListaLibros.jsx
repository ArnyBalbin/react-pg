import { useEffect, useState } from 'react';
import api from '../api/axiosConfig';

export function ListaLibros() {
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    api.get('/api/libros')
      .then(res => setLibros(res.data))
      .catch(err => console.error('Error al cargar libros:', err));
  }, []);

  return (
    <div>
      <h2>Lista de Libros</h2>
      <ul>
        {libros.map(libro => (
          <li key={libro.id}>
            {libro.titulo} - {libro.autor}
          </li>
        ))}
      </ul>
    </div>
  );
}
