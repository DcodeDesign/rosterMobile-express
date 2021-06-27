/**
 * ENVIRONMENTS
 */

const path = require('path')
const dotenv = require("dotenv")
module.exports = (env) => {
    dotenv.config(
        {
            path: env.is_dev ?
                path.join(__dirname, `../environments/.env.dev`) :
                path.join(__dirname, `../environments/.env.prod`)
        }
    )
}

