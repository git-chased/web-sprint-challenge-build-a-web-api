// Write your "actions" router here!
const express = require('express')
const Actions = require('./actions-model')
const {valActId, valActInfo, valActProjId} = require('./actions-middlware')
const router = express.Router()

router.get('/', (req, res, next) => {
    Actions.get()
            .then(action => {
                res.status(200).json(action)
            })
            .catch(next)
})

router.get('/:id', valActId, (req, res, next) => {
    res.status(200).json(req.action)
})

router.post('/', valActInfo, valActProjId, async (req, res, next) => {
    try {
        const newAct = await Actions.insert(req.body)
        res.status(201).json(newAct)
    } catch (err) {
        next(err)
    }
})

router.put('/:id', valActId, valActInfo, valActProjId, async (req, res, next) => {
    try {
       const updateAct = await Actions.update(req.params.id, req.body)
       res.status(200).json(updateAct)  
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', valActId, async (req, res, next) => {
    try {
        await Actions.remove(req.params.id)
        res.status(204).json({message: 'delete success'})
    } catch (err) {
        next(err)
    }
})

module.exports = router