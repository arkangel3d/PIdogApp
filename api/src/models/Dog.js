const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "dog",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      height: {
        type: DataTypes.JSON,
        allowNull: false,
        get() {
          let value = this.getDataValue("height");
      
          let nums = value?.split(" - ");

          const toImperial1 = Math.round(Number(nums[0]) / 2,54).toString();
          const toImperial2 = Math.round(Number(nums[1]) / 2,54).toString();
          const imperial = `${toImperial1} - ${toImperial2}`;

          return { imperial: imperial, metric: value };
        },
      },
      weight: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          let val = this.getDataValue("weight");
          let nums = val?.split(" - ");
          const toImperial1 = Math.round(Number(nums[0]) * 2, 2).toString();
          const toImperial2 = Math.round(Number(nums[1]) * 2, 2).toString();
          const imperial = `${toImperial1} - ${toImperial2}`;

          return { imperial: imperial, metric: val.toString() };
        },
      },
      life_span: {
        type: DataTypes.STRING,
        get() {
          let val = this.getDataValue("life_span");
          return val + " years" || null;
        },
      },
    },
    {
      timestamps: false,
    }
  );
};
