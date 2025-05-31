import express from 'express';
import multer from 'multer';
import path from 'path';
import { 
  getAllLibros, 
  createLibro, 
  updateLibro, 
  deleteLibro 
} from '../controllers/libroController.js';

import { 
  getAllEditoriales, 
  createEditorial 
} from '../controllers/editorialController.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Rutas para Libros
router.get('/libros', getAllLibros);
router.post('/libros', upload.single('imagen'), createLibro);
router.put('/libros/:id', upload.single('imagen'), updateLibro);
router.delete('/libros/:id', deleteLibro);

// Rutas para Editoriales
router.get('/editoriales', getAllEditoriales);
router.post('/editoriales', createEditorial);

export default router;