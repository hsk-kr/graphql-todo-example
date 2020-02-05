module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define(
    'Todo',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      checked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      userid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      x: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      y: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );
  Todo.associate = function(models) {
    Todo.belongsTo(models.User, { foreignKey: 'userid', as: 'user' });
  };
  return Todo;
};
