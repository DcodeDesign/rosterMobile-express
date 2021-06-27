/**
 * Authentication Controller
 */

const authModel = require("../models/authentication_model")
const mailer = require("../utils/mailer")
const jwt = require('jsonwebtoken');
const accessTokenSecret = process.env.TOKEN;


exports.signin = (req, res) => {
    authModel.signin(req).then(
        (datas) => {
            if (datas) {
                const accessToken = jwt.sign({id: datas.pk_user_id, username: datas.username}, accessTokenSecret);
                res.json({accessToken});
            } else {
                res.json({error: 'Username or password incorrect'});
            }
        }
    ).catch((error) => (console.log(error)))
}

exports.signup = (req, res) => {
    authModel.signup(req).then((datas) => {
        if (datas.errno !== undefined) {
            res.json(datas)
        } else {
            mailer.confirmSignup(req.body)
            res.json(datas)
        }
    }).catch((error) => error)
}

exports.forgotPassword = (req, res) => {
    authModel.forgotPassword(req).then((email) => {
        mailer.forgotPassword(req.body)
        res.json(email)
    }).catch((error) => error)
}

exports.modifyPassword = (req, res) => {
    authModel.modifyPassword(req).then((datas) => {
        // TODO: mailer.confirmModifyPassword(req.body)
        res.json(datas)
    }).catch((error) => error)
}

exports.logout = (req, res) => {
    // console.log('isLogout: ' + req.logout() )
    req.session.destroy((err) => {
        res.json({message: 'Successfully logged out'});
    });
}
