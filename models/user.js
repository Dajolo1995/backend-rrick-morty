/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    'idUser': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: "null",
      autoIncrement: true
    },
    'name': {
      type: DataTypes.STRING(45),
      allowNull: false,
      comment: "null"
    },
    'email': {
      type: DataTypes.STRING(45),
      allowNull: false,
      comment: "null"
    },
    'password': {
      type: DataTypes.STRING(45),
      allowNull: false,
      comment: "null"
    },
    'cod': {
      type: DataTypes.STRING(45),
      allowNull: true,
      comment: "null"
    }
  }, {
    tableName: 'user',
    timestamps: false
  });
};
