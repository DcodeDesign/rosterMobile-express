/**
 * ROUTER AUTHENTICATION
 */
const authController = require("../../controllers/authentication_controller")

module.exports = (router) => {
    router.post('/api/signin', authController.signin);
}
