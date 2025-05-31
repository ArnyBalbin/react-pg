import Libro from '../models/libro.js';
import Editorial from '../models/editorial.js';

export const getAllLibros = async (req, res) => {
  try {
    const libros = await Libro.findAll({ include: Editorial });
    res.json(libros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createLibro = async (req, res) => {
  try {
    const { titulo, autor, anio, EditorialId } = req.body;
    const imagen = req.file ? req.file.filename : null;
    const nuevoLibro = await Libro.create({ titulo, autor, anio, imagen, EditorialId });
    res.status(201).json(nuevoLibro);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateLibro = async (req, res) => {
  try {
    const libro = await Libro.findByPk(req.params.id);
    if (!libro) return res.status(404).json({ error: 'Libro no encontrado' });

    libro.titulo = req.body.titulo;
    libro.autor = req.body.autor;
    libro.anio = req.body.anio;
    libro.EditorialId = req.body.EditorialId;
    
    if (req.file) libro.imagen = req.file.filename;
    
    await libro.save();
    res.json(libro);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteLibro = async (req, res) => {
  try {
    await Libro.destroy({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};