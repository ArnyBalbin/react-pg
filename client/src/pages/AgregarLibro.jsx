import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearLibro, obtenerEditoriales } from '../services/libreriaService';

export const AgregarLibro = () => {
  const [formData, setFormData] = useState({
    titulo: "",
    autor: "",
    anio: "",
    EditorialId: "",
    imagen: null
  });
  const [editoriales, setEditoriales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const cargarEditoriales = async () => {
      try {
        const { data } = await obtenerEditoriales();
        setEditoriales(data);
        setLoading(false);
      } catch (error) {
        setError('Error al cargar editoriales');
        setLoading(false);
      }
    };
    cargarEditoriales();
  }, []);

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

      await crearLibro(data);
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.error || "Error al agregar el libro");
    }
  };

  if (loading) {
    return <div className="text-center my-5">Cargando editoriales...</div>;
  }

  return (
    <div className="container my-5">
      <div className="card shadow-sm rounded border-1">
        <div className="card-body">
          <h3 className="text-center mb-4">Agregar Nuevo Libro</h3>
          
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
                <option value="">Seleccione una editorial</option>
                {editoriales.map(editorial => (
                  <option key={editorial.id} value={editorial.id}>
                    {editorial.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Imagen (opcional)</label>
              <input
                type="file"
                className="form-control"
                name="imagen"
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>
            <button type="submit" className="btn btn-success w-100">
              Guardar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};