const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');

router
    .get('/movies', moviesController.list)
    .get('/movies/new', moviesController.new)
    .get('/movies/recommended', moviesController.recomended)
    .get('/movies/detail/:id', moviesController.detail);


module.exports = router;