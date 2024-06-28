// Write your "projects" router here!
const express = require('express')
const Projects = require('./projects-model')
const {valProjId, valProjInfo} = require('./projects-middleware')
const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const projects = await Projects.get()
        res.status(200).json(projects)
    } catch(err) {
        next(err)
    }
})

router.get('/:id', valProjId, (req, res) => {
    res.status(200).json(req.project)
})

router.post('/', valProjInfo, async (req, res, next) => {
    try {
        const newProj = await Projects.insert(req.body)
        res.status(201).json(newProj)
    } catch (err) {
        next(err)
    }
})

router.put('/:id', valProjId, valProjInfo, async (req, res, next) => {
    try {
        const updateProj = await Projects.update(req.params.id, req.body)
        res.status(200).json(updateProj)
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', valProjId, async (req, res, next) => {
    try {
        await Projects.remove(req.params.id)
        res.status(204).json({message: 'deleted'})
    } catch (err) {
        next(err)
    }
})

router.get('/:id/actions', valProjId, async (req, res, next) => {
    try {
        const actions = await Projects.getProjectActions(req.params.id)
        res.status(200).json(actions)
    } catch (err) {
        next(err)
    }
})

module.exports = router