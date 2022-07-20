const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    'Pokemon',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        set(value) {
          this.setDataValue('name', value.toLowerCase());
        },
      },
      hp: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 300,
        },
      },
      attack: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 200,
        },
      },
      defense: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 250,
        },
      },
      speed: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 200,
        },
      },
      height: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 200,
        },
      },
      weight: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 1000,
        },
      },
    },
    { timestamps: false }
  );
};
