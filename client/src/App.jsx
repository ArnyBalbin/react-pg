import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { ListaEditoriales } from "./pages/ListaEditoriales";
import { ListaLibros } from "./pages/ListaLibros";
import { EditarLibro } from "./pages/EditarLibro";
import { AgregarLibro } from "./pages/AgregarLibro";
import { useState } from 'react';

function App() {
  const [successMessage, setSuccessMessage] = useState('');

  return (
    <Router>
      <div className="container py-4">
        <Header />
        
        {successMessage && (
          <div className="alert alert-success alert-dismissible fade show mt-3" role="alert">
            {successMessage}
            <button 
              type="button" 
              className="btn-close" 
              data-bs-dismiss="alert" 
              aria-label="Close"
              onClick={() => setSuccessMessage('')}
            ></button>
          </div>
        )}
        
        <Routes>
          <Route 
            path="/editoriales" 
            element={<ListaEditoriales setSuccessMessage={setSuccessMessage} />} 
          />
          <Route 
            path="/" 
            element={<ListaLibros setSuccessMessage={setSuccessMessage} />} 
          />
          <Route 
            path="/agregar" 
            element={<AgregarLibro setSuccessMessage={setSuccessMessage} />} 
          />
          <Route 
            path="/editar/:id" 
            element={<EditarLibro setSuccessMessage={setSuccessMessage} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;