/**
 * tasks Model
 */

const connection = require("../database/connection_database.js")

exports.getAll = (req) => {
    console.log(req.user.id);
    return connection.then((conn) => {
        return conn.query(`SELECT mut.pk_user_task,
           mut.fk_user_id,
           mut.fk_task_id,
           mut.is_author,
           mut.is_responsable,
           mut.is_speaker,
           t.pk_tasks_id,
           t.fk_backlog_id,
           (SELECT p.name
            FROM backlog
                     INNER JOIN mtm_team_project mtn ON backlog.pk_backlog_id = mtn.fk_backlog_id
                     INNER JOIN project p ON mtn.fk_project_id = p.pk_project_id
            WHERE pk_backlog_id = t.fk_backlog_id)   as name_project,
           t.fk_sprint_id,
           (SELECT s.name
            FROM tasks
                     INNER JOIN sprint s on tasks.fk_sprint_id = s.pk_sprint_id
            WHERE s.pk_sprint_id = t.fk_sprint_id
              AND tasks.pk_tasks_id = t.pk_tasks_id) as name_sprint,
           t.fk_workflow_id,
           (SELECT w.name
            FROM tasks
                     INNER JOIN workflow w on tasks.fk_workflow_id = w.pk_workflow_id
            WHERE w.pk_workflow_id = t.fk_workflow_id
              AND tasks.pk_tasks_id = t.pk_tasks_id) as name_workflow,
           t.name,
           t.description,
           t.fk_epic_id,
           t.story_point,
           t.definition_of_ready,
           t.definition_of_done,
           t.create_at,
           t.update_at
    FROM user
             INNER JOIN mtm_user_task mut on user.pk_user_id = mut.fk_user_id
             INNER JOIN tasks t on mut.fk_task_id = t.pk_tasks_id
    WHERE pk_user_id = ?;`, [req.user.id])
            .then(tasks => {
                return tasks;
            }).catch(error => error)
    }).catch(error => error)
}
