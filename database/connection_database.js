/**
 * Connection Database
 */

const mysql = require("promise-mysql")

const host = process.env.HOST
const port = process.env.PORT_DB
const userDB = process.env.USER_DB
const password = process.env.PASS
const database = process.env.DB

module.exports = mysql.createConnection({
    host: host,
    port: port,
    user: userDB,
    password: password,
    database: database
}).catch(r => console.log(r))

