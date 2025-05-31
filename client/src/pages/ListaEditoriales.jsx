import { useState, useEffect } from 'react';
import { obtenerEditoriales, crearEditorial, eliminarEditorial } from '../services/libreriaService';

export const ListaEditoriales = () => {
  const [editoriales, setEditoriales] = useState([]);
  const [nombre, setNombre] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const cargarEditoriales = async () => {
      try {
        const { data } = await obtenerEditoriales();
        setEditoriales(data);
        setLoading(false);
      } catch (error) {
        setError('Error al cargar las editoriales');
        setLoading(false);
      }
    };
    cargarEditoriales();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await crearEditorial({ nombre });
      setEditoriales([...editoriales, data]);
      setNombre('');
      setSuccess('Editorial agregada correctamente');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError(error.response?.data?.error || "Error al agregar la editorial");
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta editorial?')) {
      try {
        await eliminarEditorial(id);
        setEditoriales(editoriales.filter(e => e.id !== id));
        setSuccess('Editorial eliminada correctamente');
        setTimeout(() => setSuccess(''), 3000);
      } catch (error) {
        setError('Error al eliminar la editorial');
      }
    }
  };

  if (loading) {
    return <div className="text-center my-5">Cargando editoriales...</div>;
  }

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-8 mb-4 mb-md-0">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="mb-3">Lista de Editoriales</h4>
              
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}
              
              {editoriales.length > 0 ? (
                <ul className="list-group">
                  {editoriales.map(editorial => (
                    <li 
                      key={editorial.id} 
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <span>{editorial.nombre}</span>
                      <button 
                        className="btn btn-sm btn-danger"
                        onClick={() => handleEliminar(editorial.id)}
                      >
                        Eliminar
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted">No hay editoriales registradas.</p>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="mb-3">Agregar Editorial</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-success w-100">
                  Agregar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};