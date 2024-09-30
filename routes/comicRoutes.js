const express = require('express');
const { getComics, getComicDetails, addFavoriteComic } = require('../controllers/comicController');
const router = express.Router();

router.get('/', getComics);
router.get('/:id', getComicDetails);
router.post('/favorites', addFavoriteComic);
module.exports = router;
