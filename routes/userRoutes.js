const express = require('express');
const { getFavorites, addFavorite } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/favorites', protect, getFavorites);
router.post('/favorites', protect, addFavorite);

module.exports = router;
