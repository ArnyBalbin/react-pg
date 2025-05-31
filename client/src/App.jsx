import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { ListaEditoriales } from "./pages/ListaEditoriales";
import { ListaLibros } from "./pages/ListaLibros";
import { EditarLibro } from "./pages/EditarLibro";
import { AgregarLibro } from "./pages/AgregarLibro";
import { NotFound } from "./pages/NotFound"; // Nuevo componente para rutas no encontradas

function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <div className="mt-4"> {/* Agregar margen superior para separar del header */}
          <Routes>
            <Route path="/editoriales" element={<ListaEditoriales />} />
            <Route path="/" element={<ListaLibros />} />
            <Route path="/agregar" element={<AgregarLibro />} />
            <Route path="/editar/:id" element={<EditarLibro />} />
            <Route path="*" element={<NotFound />} /> {/* Manejar rutas no encontradas */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;