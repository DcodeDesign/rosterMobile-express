/**
 * Authentication Controller
 */

const tasksModel = require("../models/tasks_model")

exports.getAll = (req, res) => {
    tasksModel.getAll(req).then((datas) => {
        console.log(datas);
       res.json(datas)
    }).catch((error) => (console.log(error)))
}
