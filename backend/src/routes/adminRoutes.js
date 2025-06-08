const express = require('express')
const routerAdmin = express.Router();
const { admin } = require('../middleware/adminMiddleware');
const { getAllUsers, deleteUser, getAllOffersAdmin, deleteOfferAdmin } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware')
routerAdmin.route('/users').get(protect, admin, getAllUsers);
routerAdmin.route('/users/:id').delete(protect, admin, deleteUser);
routerAdmin.route('/offers').get(protect, admin, getAllOffersAdmin);
routerAdmin.route('/offers/:id').delete(protect, admin, deleteOfferAdmin);
module.exports = routerAdmin;