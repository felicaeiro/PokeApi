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
          max: 255,
        },
      },
      attack: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 200,
        },
      },
      specialAttack: {
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
          max: 255,
        },
      },
      specialDefense: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 255,
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
        type: DataTypes.DECIMAL(10, 1),
        validate: {
          min: 0.1,
          max: 20,
        },
      },
      weight: {
        type: DataTypes.DECIMAL(10, 1),
        validate: {
          min: 0.1,
          max: 1000,
        },
      },
    },
    { timestamps: false }
  );
};
