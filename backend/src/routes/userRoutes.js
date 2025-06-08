// dodaj ten import na samą górę pliku
const express = require('express')

const { getUserProfile, updateUserProfile, getUserById } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

const routerUser = express.Router()

routerUser.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

routerUser.route('/:id').get(getUserById)

module.exports = routerUser
