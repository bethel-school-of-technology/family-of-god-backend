'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "Deleted" to table "comments"
 * addColumn "Deleted" to table "posts"
 * changeColumn "PostId" on table "comments"
 * changeColumn "PostId" on table "comments"
 * changeColumn "PostId" on table "comments"
 * changeColumn "PostId" on table "comments"
 *
 **/

var info = {
    "revision": 9,
    "name": "add_deleted_column",
    "created": "2020-11-17T20:48:20.880Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "comments",
            "Deleted",
            {
                "type": Sequelize.BOOLEAN,
                "field": "Deleted",
                "defaultValue": false
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "posts",
            "Deleted",
            {
                "type": Sequelize.BOOLEAN,
                "field": "Deleted",
                "defaultValue": false
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
                "onUpdate": "CASCADE",
                "onDelete": "NO ACTION",
                "references": {
                    "model": "posts",
                    "key": "PostId"
                },
                "allowNull": true,
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
                "onUpdate": "CASCADE",
                "onDelete": "NO ACTION",
                "references": {
                    "model": "posts",
                    "key": "PostId"
                },
                "allowNull": true,
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
                "onUpdate": "CASCADE",
                "onDelete": "NO ACTION",
                "references": {
                    "model": "posts",
                    "key": "PostId"
                },
                "allowNull": true,
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
                "onUpdate": "CASCADE",
                "onDelete": "NO ACTION",
                "references": {
                    "model": "posts",
                    "key": "PostId"
                },
                "allowNull": true,
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
