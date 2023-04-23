"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize(`${process.env.NAME_DATABASE}`, `${process.env.USER_DATABASE}`, `${process.env.PASS_DATABASE}`, {
    host: process.env.HOST_DATABASE,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
exports.default = db;
