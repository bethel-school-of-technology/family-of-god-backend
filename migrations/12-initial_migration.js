'use strict';

var Sequelize = require('sequelize');

var info = {
    "revision": 12,
    "name": "initial_migration",
    "created": "2020-12-04T16:52:24.660Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "prayerRequests",
        {
            "PrayerRequestId": {
                "type": Sequelize.INTEGER,
                "field": "PrayerRequestId",
                "primaryKey": true,
                "allowNull": false,
                "autoIncrement": true
            },
            "PrayerRequestTitle": {
                "type": Sequelize.STRING,
                "field": "PrayerRequestTitle"
            },
            "PrayerRequestBody": {
                "type": Sequelize.STRING,
                "field": "PrayerRequestBody"
            },
            "UserId": {
                "type": Sequelize.INTEGER,
                "field": "UserId"
            },
            "Deleted": {
                "type": Sequelize.BOOLEAN,
                "field": "Deleted",
                "defaultValue": false
            },
            "createdAt": {
                "type": Sequelize.DATE,
                "field": "createdAt",
                "allowNull": false
            },
            "updatedAt": {
                "type": Sequelize.DATE,
                "field": "updatedAt",
                "allowNull": false
            }
        },
        {}
    ]
}];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize) {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length) {
                    let command = migrationCommands[index];
                    console.log("[#" + index + "] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                } else
                    resolve();
            }
            next();
        });
    },
    info: info
};