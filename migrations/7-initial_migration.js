'use strict';

var Sequelize = require('sequelize');

var info = {
    "revision": 7,
    "name": "initial_migration",
    "created": "2020-11-17T17:17:51.158Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "comments",
        {
            "PostId": {
                "type": Sequelize.INTEGER,
                "field": "PostId",
                "primaryKey": true,
                "allowNull": false,
                "autoIncrement": true
            },
            "CommentBody": {
                "type": Sequelize.STRING,
                "field": "CommentBody"
            },
            "UserId": {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
                "references": {
                    "model": "users",
                    "key": "UserId"
                },
                "allowNull": true,
                "field": "UserId"
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