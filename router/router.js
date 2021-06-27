/**
 * ROUTER
 */
const express = require("express")
const router = express.Router()

require('./authentication/authentication')(router)
require('./tasks/tasks')(router)

module.exports = router
