import Editorial from '../models/editorial.js';

export const getAllEditoriales = async (req, res) => {
  try {
    const editoriales = await Editorial.findAll();
    res.json(editoriales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createEditorial = async (req, res) => {
  try {
    const { nombre } = req.body;
    const nuevaEditorial = await Editorial.create({ nombre });
    res.status(201).json(nuevaEditorial);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};