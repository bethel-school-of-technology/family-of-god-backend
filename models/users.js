'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class users extends Model {

        static associate(models) {

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