const express = require('express')
const routerMatch = express.Router();
const { getMyMatches, updateMatchStatus } = require('../controllers/matchController');
const { protect } = require('../middleware/authMiddleware')
routerMatch.route('/').get(protect, getMyMatches);
routerMatch.route('/:id/status').put(protect, updateMatchStatus);
module.exports = routerMatch;