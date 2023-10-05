const express = require('express')
const ControllerPessoa = require('../controllers/pessoa.js')

const controller = new ControllerPessoa()
const router = express.Router()

router.get('/api/pessoa/:id', controller.PegarUm)
router.get('/api/pessoa/', controller.PegarTodos)
router.post('/api/pessoa', controller.Add)
router.put('/api/pessoa/:id', controller.Update)
router.delete('/api/pessoa/:id', controller.Delete)

module.exports = router