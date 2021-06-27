/**
 * Authentication Controller
 */

const connection = require("../database/connection_database.js")
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.signin = (req) => {
    return connection.then((conn) => {
        return conn.query("SELECT pk_user_id, pass, email, first_name, last_name FROM user WHERE email = ? ", [req.body.email])
            .then(user => {
                if (user && user.length > 0) {
                    if (bcrypt.compareSync(req.body.password, user[0].pass)) {
                        return user[0]
                    } else {
                        return false
                    }
                } else {
                    return false;
                }
            }).catch(error => error)
    }).catch(error => error)
}

exports.signup = (req) => {
    console.log(req.body)
    return connection.then((conn) => {
        return conn.query("INSERT INTO user SET ? ", {
            email: req.body.username,
            pass: bcrypt.hashSync(req.body.password, saltRounds),
            first_name: req.body.first_name,
            last_name: req.body.last_name,
        }).catch(error => error)
    })
}

exports.forgotPassword = (req) => {
    return connection.then((conn) => {
        return conn.query("SELECT email FROM user WHERE email = ? ", [req.body.username])
            .then(user => (user[0].email)
            ).catch(error => error)
    });
}

exports.modifyPassword = (req) => {
    return connection.then((conn) => {
        return conn.query("SELECT pk_user_id FROM user WHERE email = ? ", [req.body.token])
            .then(user => {
                return conn.query("UPDATE user SET ? WHERE pk_user_id = ?", [
                    {
                        pass: bcrypt.hashSync(req.body.password, saltRounds),
                    },
                    user[0].pk_user_id
                ]).then(data => data)
                    .catch(error => error)
            })
    })
}


