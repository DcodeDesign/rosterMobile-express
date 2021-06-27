/**
 * ROUTER Tasks
 */
const tasksController = require("../../controllers/tasks_controller")
const authenticateJWT = require('../../utils/authenticate-jwt')

module.exports = (router) => {
    router.get('/api/tasks', authenticateJWT, tasksController.getAll);
}
