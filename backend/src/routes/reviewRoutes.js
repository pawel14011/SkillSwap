const express = require('express')
const routerReview = express.Router();
const { createReview, getReviewsForUser } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware')
routerReview.route('/').post(protect, createReview);
routerReview.route('/user/:userId').get(getReviewsForUser);
module.exports = routerReview;