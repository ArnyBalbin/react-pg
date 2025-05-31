import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded shadow-sm px-3">
      <Link className="navbar-brand" to="/">
        Librería App
      </Link>
      
      <button 
        className="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNav"
        aria-controls="navbarNav" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      
      <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link 
              className={`nav-link ${isActive('/') ? 'active fw-bold' : ''}`} 
              to="/"
            >
              Libros
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              className={`nav-link ${isActive('/agregar') ? 'active fw-bold' : ''}`} 
              to="/agregar"
            >
              Agregar Libro
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              className={`nav-link ${isActive('/editoriales') ? 'active fw-bold' : ''}`} 
              to="/editoriales"
            >
              Editoriales
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};