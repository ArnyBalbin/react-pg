import { useEffect, useState } from 'react';
import api from '../api/axiosConfig';

export function ListaEditoriales() {
  const [editoriales, setEditoriales] = useState([]);

  useEffect(() => {
    api.get('/api/editoriales')
      .then(res => setEditoriales(res.data))
      .catch(err => console.error('Error al obtener editoriales:', err));
  }, []);

  return (
    <div>
      <h2>Lista de Editoriales</h2>
      <ul>
        {editoriales.map(edit => (
          <li key={edit.id}>{edit.nombre}</li>
        ))}
      </ul>
    </div>
  );
}
