'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "CommentId" to table "comments"
 * changeColumn "PostId" on table "comments"
 * changeColumn "PostId" on table "comments"
 * changeColumn "PostId" on table "comments"
 *
 **/

var info = {
    "revision": 8,
    "name": "add_CommentId",
    "created": "2020-11-17T20:06:48.414Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "comments",
            "CommentId",
            {
                "type": Sequelize.INTEGER,
                "field": "CommentId",
                "primaryKey": true,
                "allowNull": false,
                "autoIncrement": true
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "comments",
            "PostId",
            {
                "type": Sequelize.INTEGER,
                "field": "PostId"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "comments",
            "PostId",
            {
                "type": Sequelize.INTEGER,
                "field": "PostId"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "comments",
            "PostId",
            {
                "type": Sequelize.INTEGER,
                "field": "PostId"
            }
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
