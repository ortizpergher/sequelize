import Sequelize, { Model } from 'sequelize';

class Post extends Model {
  static init(sequelize) {
    super.init(
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
          allowNull: true,
          references: {
            model: 'users',
            key: 'uid',
          },
        },
      },
      {
        sequelize,
        schema: 'post',
        tableName: 'posts',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      as: 'users',
      foreignKey: 'user_uid',
    });
  }
}

export default Post;
