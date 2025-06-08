const express = require('express')
const routerOffer = express.Router()
const { createOffer, getAllOffers, getOfferById, updateOffer, deleteOffer } = require('../controllers/offerController')
const { protect } = require('../middleware/authMiddleware')
routerOffer.route('/').get(getAllOffers).post(protect, createOffer)
routerOffer.route('/:id').get(getOfferById).put(protect, updateOffer).delete(protect, deleteOffer)

module.exports = routerOffer
