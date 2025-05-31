import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { obtenerLibroPorId, actualizarLibro, obtenerEditoriales } from '../services/libreriaService';

export const EditarLibro = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [libro, setLibro] = useState(null);
  const [editoriales, setEditoriales] = useState([]);
  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    anio: '',
    EditorialId: '',
    imagen: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [libroResponse, editorialesResponse] = await Promise.all([
          obtenerLibroPorId(id),
          obtenerEditoriales()
        ]);
        
        setLibro(libroResponse.data);
        setEditoriales(editorialesResponse.data);
        
        setFormData({
          titulo: libroResponse.data.titulo,
          autor: libroResponse.data.autor,
          anio: libroResponse.data.anio,
          EditorialId: libroResponse.data.EditorialId,
          imagen: null
        });
        
        setLoading(false);
      } catch (error) {
        setError('Error al cargar los datos del libro');
        setLoading(false);
      }
    };
    
    cargarDatos();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      imagen: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('titulo', formData.titulo);
      data.append('autor', formData.autor);
      data.append('anio', formData.anio);
      data.append('EditorialId', formData.EditorialId);
      if (formData.imagen) {
        data.append('imagen', formData.imagen);
      }

      await actualizarLibro(id, data);
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.error || "Error al actualizar el libro");
    }
  };

  if (loading) {
    return <div className="text-center my-5">Cargando libro...</div>;
  }

  return (
    <div className="container my-5">
      <div className="card shadow-sm rounded border-1">
        <div className="card-body">
          <h3 className="text-center mb-4">Editar Libro</h3>
          
          {error && <div className="alert alert-danger">{error}</div>}
          
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-3">
              <label className="form-label">Título</label>
              <input
                type="text"
                className="form-control"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Autor</label>
              <input
                type="text"
                className="form-control"
                name="autor"
                value={formData.autor}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Año</label>
              <input
                type="number"
                className="form-control"
                name="anio"
                value={formData.anio}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Editorial</label>
              <select
                className="form-select"
                name="EditorialId"
                value={formData.EditorialId}
                onChange={handleChange}
                required
              >
                {editoriales.map(editorial => (
                  <option key={editorial.id} value={editorial.id}>
                    {editorial.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Imagen actual</label><br />
              {libro.imagen ? (
                <img 
                  src={`${import.meta.env.VITE_API_URL}/uploads/${libro.imagen}`} 
                  width="100" 
                  className="rounded"
                  alt="Portada actual"
                />
              ) : (
                <span>No hay imagen</span>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Cambiar imagen (opcional)</label>
              <input
                type="file"
                className="form-control"
                name="imagen"
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Actualizar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};