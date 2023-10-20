const express = require('express')
const ControllerPessoa = require('../controllers/pessoa.js')
const authMiddleware = require('../middleware/auth.js')

const controller = new ControllerPessoa()
const router = express.Router()

router.post('/api/login', controller.Login)
router.get('/api/pessoa/:id', authMiddleware, controller.PegarUm)
router.get('/api/pessoa/', authMiddleware, controller.PegarTodos)
router.post('/api/addpessoa', authMiddleware, controller.Add)
router.put('/api/pessoa/:id', authMiddleware, controller.Update)
router.delete('/api/pessoa/:id', authMiddleware, controller.Delete)

module.exports = router