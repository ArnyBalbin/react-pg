import { Link } from "react-router-dom";

export const Header = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark mt-3 rounded shadow-sm px-3">
    <Link className="navbar-brand" to="/">
      <i class="fas fa-book me-2"></i>Gestión de Libros
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
          <Link className="nav-link active" to="/">
            <i className="fas fa-book me-1"></i>Libros
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/agregar">
            <i className="fas fa-plus me-1"></i>Agregar Libro
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/editoriales">
            <i className="fas fa-building me-1"></i>Editoriales
          </Link>
        </li>
      </ul>
    </div>
  </nav>
);