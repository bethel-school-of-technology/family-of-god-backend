'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class comments extends Model {

        static associate(models) {

        }
    };
    comments.init({
        CommentId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        CommentBody: DataTypes.STRING,
        UserId: DataTypes.INTEGER,
        PostId: DataTypes.INTEGER,
        Deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    }, {
        sequelize,
        modelName: 'comments',
    });
    return comments;
};