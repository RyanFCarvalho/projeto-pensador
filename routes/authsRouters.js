const express = require('express')
const router = express.Router()

const UsersController = require('../controllers/AuthsController')

router.get('/register', UsersController.registerUser)
router.get('/login', UsersController.loginUser)
router.get('/logout', UsersController.logoutUser)
router.post('/register', UsersController.registerUserSave)
router.post('/login', UsersController.loginUserSave)

module.exports = router
