import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-50">
      <div className="text-center">
        <h1 className="display-1 fw-bold">404</h1>
        <p className="fs-3"> 
          <span className="text-danger">¡Ups!</span> Página no encontrada.
        </p>
        <p className="lead">
          La página que estás buscando no existe o fue movida.
        </p>
        <Link to="/" className="btn btn-primary mt-3">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};