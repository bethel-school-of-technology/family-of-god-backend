'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class posts extends Model {

        static associate(models) {

        }
    };
    posts.init({
        PostId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        PostTitle: DataTypes.STRING,
        PostBody: DataTypes.STRING,
        UserId: DataTypes.INTEGER,
        Deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    }, {
        sequelize,
        modelName: 'posts',
    });
    return posts;
};