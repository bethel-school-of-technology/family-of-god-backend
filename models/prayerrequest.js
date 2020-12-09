'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class prayerRequest extends Model {

        static associate(models) {
            // define association here
        }

    };
    prayerRequest.init({
        PrayerRequestId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        PrayerRequestTitle: DataTypes.STRING,
        PrayerRequestBody: DataTypes.STRING,
        UserId: DataTypes.INTEGER,
        Deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    }, {
        sequelize,
        modelName: 'prayerrequest',
    });
    return prayerRequest;
};