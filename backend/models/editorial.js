import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Editorial = sequelize.define('Editorial', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

export default Editorial;
