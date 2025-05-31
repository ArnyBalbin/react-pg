import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Editorial from './editorial.js';

const Libro = sequelize.define('Libro', {
  titulo: { type: DataTypes.STRING, allowNull: false },
  autor: { type: DataTypes.STRING, allowNull: false },
  anio: { type: DataTypes.INTEGER, allowNull: false },
  imagen: { type: DataTypes.STRING }
});

Libro.belongsTo(Editorial, { foreignKey: 'EditorialId' });
Editorial.hasMany(Libro);

export default Libro;