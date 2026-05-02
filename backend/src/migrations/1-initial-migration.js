'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Categories", deps: []
 * createTable "Orders", deps: []
 * createTable "Users", deps: []
 * createTable "Products", deps: [Categories]
 * createTable "OrderItems", deps: [Orders, Products]
 *
 **/

var info = {
    "revision": 1,
    "name": "initial-migration",
    "created": "2022-08-25T16:30:07.564Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Categories",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.STRING,
                    "field": "name"
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
    },
    {
        fn: "createTable",
        params: [
            "Orders",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "cliente": {
                    "type": Sequelize.STRING,
                    "field": "cliente"
                },
                "total": {
                    "type": Sequelize.FLOAT,
                    "field": "total"
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
    },
    {
        fn: "createTable",
        params: [
            "Users",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.STRING,
                    "field": "name"
                },
                "email": {
                    "type": Sequelize.STRING,
                    "field": "email"
                },
                "birthday": {
                    "type": Sequelize.INTEGER,
                    "field": "birthday"
                },
                "cellphone": {
                    "type": Sequelize.INTEGER,
                    "field": "cellphone"
                },
                "password": {
                    "type": Sequelize.STRING,
                    "field": "password"
                },
                "cep": {
                    "type": Sequelize.INTEGER,
                    "field": "cep"
                },
                "addressNumber": {
                    "type": Sequelize.INTEGER,
                    "field": "addressNumber"
                },
                "addressComplement": {
                    "type": Sequelize.STRING,
                    "field": "addressComplement"
                },
                "address": {
                    "type": Sequelize.STRING,
                    "field": "address"
                },
                "city": {
                    "type": Sequelize.STRING,
                    "field": "city"
                },
                "state": {
                    "type": Sequelize.STRING,
                    "field": "state"
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
    },
    {
        fn: "createTable",
        params: [
            "Products",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.STRING,
                    "field": "name"
                },
                "categoryId": {
                    "type": Sequelize.INTEGER,
                    "field": "categoryId",
                    "references": {
                        "model": "Categories",
                        "key": "id"
                    }
                },
                "price": {
                    "type": Sequelize.FLOAT,
                    "field": "price"
                },
                "illustration": {
                    "type": Sequelize.STRING,
                    "field": "illustration"
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
    },
    {
        fn: "createTable",
        params: [
            "OrderItems",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "orderId": {
                    "type": Sequelize.INTEGER,
                    "field": "orderId",
                    "references": {
                        "model": "Orders",
                        "key": "id"
                    }
                },
                "productId": {
                    "type": Sequelize.INTEGER,
                    "field": "productId",
                    "references": {
                        "model": "Products",
                        "key": "id"
                    }
                },
                "quantity": {
                    "type": Sequelize.INTEGER,
                    "field": "quantity"
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
