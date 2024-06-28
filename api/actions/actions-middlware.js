// add middlewares here related to actions
const Actions = require('./actions-model')
const Projects = require('../projects/projects-model')

async function valActId(req, res, next) {
    try {
        const action = await Actions.get(req.params.id)
        if (!action){
            res.status(404).json({
                message: "no action found"
            })
        } else {
            req.action = action;
            next()
        }

    } catch (err) {
        next(err)
    }
}

function valActInfo (req, res, next) {
    const {description, notes, project_id} = req.body
    try {
        if (!notes || !description || !project_id){
            res.status(400).json({
                message: "please provide all fields"
            })
        } else {
            next()
        }
    } catch (err) {
        next(err)
    }
}

async function valActProjId(req, res, next) {
    try {
        const project = await Projects.get(req.body.project_id)
        if (!project) {
            res.status(400).json({
                message: 'invalid project_id'
            })
        } else {
            next()
        }
    } catch (err) {
        next(err)
    }
}



module.exports = {
    valActId, 
    valActInfo,
    valActProjId
}
