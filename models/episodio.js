/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "episodio",
    {
      User_idUser: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        comment: "null",
        references: {
          model: "user",
          key: "idUser",
        },
      },
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        comment: "null",
        autoIncrement: true,
      },
      nameChapter: {
        type: DataTypes.STRING(45),
        allowNull: false,
        comment: "null",
      },
      nameEpisode: {
        type: DataTypes.STRING(45),
        allowNull: false,
        comment: "null",
      },
      date: {
        type: DataTypes.STRING(45),
        allowNull: false,
        comment: "null",
      },
      location: {
        type: DataTypes.JSON,
        allowNull: true,
        comment: "null",
      },
      namePerson: {
        type: DataTypes.JSON,
        allowNull: true,
        comment: "null",
      },
    },
    {
      tableName: "episodio",
      timestamps: false,
    }
  );
};
