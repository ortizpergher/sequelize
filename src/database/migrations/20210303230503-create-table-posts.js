module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'posts',
      {
        uid: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        content: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        user_uid: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
            key: 'uid',
          },
        },
        created_at: {
          type: Sequelize.DataTypes.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        schema: 'post',
      }
    );
  },

  down: async queryInterface => {
    await queryInterface.dropTable({
      tableName: 'posts',
      schema: 'post',
    });
  },
};
