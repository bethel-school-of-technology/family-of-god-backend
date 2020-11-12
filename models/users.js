'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class users extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    users.init({
        UserId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        FirstName: DataTypes.STRING,
        LastName: DataTypes.STRING,
        Email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        Username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        Admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        Deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        Password: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'users',
    });
    return users;
};