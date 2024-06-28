// add middlewares here related to projects
const Projects = require('./projects-model')

async function valProjId(req, res, next) {
    try {
        const project = await Projects.get(req.params.id)
        if (!project){
            res.status(404).json({
                message: "no project found"
            })
        } else {
            req.project = project;
            next()
        }
    } catch (err) {
        next(err)
    }
}

function valProjInfo (req, res, next) {
    const {description, name, completed} = req.body
    try {
        if (!description || !name || typeof completed !== 'boolean'){
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



module.exports = {
    valProjId, 
    valProjInfo,
}

