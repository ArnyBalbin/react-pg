import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { obtenerLibros, eliminarLibro } from '../services/libreriaService';

export const ListaLibros = () => {
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const cargarLibros = async () => {
      try {
        const { data } = await obtenerLibros();
        setLibros(data);
        setLoading(false);
      } catch (error) {
        setError('Error al cargar los libros');
        setLoading(false);
      }
    };
    cargarLibros();
  }, []);

  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este libro?')) {
      try {
        await eliminarLibro(id);
        setLibros(libros.filter(libro => libro.id !== id));
        setSuccess('Libro eliminado correctamente');
        setTimeout(() => setSuccess(''), 3000);
      } catch (error) {
        setError('Error al eliminar el libro');
      }
    }
  };

  if (loading) {
    return <div className="text-center my-5">Cargando libros...</div>;
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="card shadow-sm rounded border-1">
            <div className="card-body px-4 py-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-center mb-0">Lista de Libros</h2>
                <Link to="/agregar" className="btn btn-primary">
                  Agregar Libro
                </Link>
              </div>
              
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}
              
              <div className="table-responsive rounded overflow-hidden">
                {libros.length > 0 ? (
                  <table className="table table-striped table-bordered text-center mb-0 align-middle">
                    <thead className="table-dark">
                      <tr>
                        <th>Título</th>
                        <th>Autor</th>
                        <th>Año</th>
                        <th>Editorial</th>
                        <th>Imagen</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {libros.map(libro => (
                        <tr key={libro.id}>
                          <td>{libro.titulo}</td>
                          <td>{libro.autor}</td>
                          <td>{libro.anio}</td>
                          <td>{libro.Editorial?.nombre}</td>
                          <td>
                            {libro.imagen ? (
                              <img 
                                src={`${import.meta.env.VITE_API_URL}/uploads/${libro.imagen}`} 
                                alt="Portada" 
                                width="80" 
                                height="60" 
                                className="rounded"
                              />
                            ) : (
                              <span>Sin imagen</span>
                            )}
                          </td>
                          <td>
                            <Link 
                              to={`/editar/${libro.id}`} 
                              className="btn btn-sm btn-primary me-1"
                            >
                              Editar
                            </Link>
                            <button 
                              className="btn btn-sm btn-danger"
                              onClick={() => handleEliminar(libro.id)}
                            >
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="alert alert-warning text-center">
                    No hay libros disponibles.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};