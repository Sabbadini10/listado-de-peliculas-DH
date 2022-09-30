const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');
const createValidation = require('../validations/createvalidations')

router
    .get('/movies', moviesController.list)
    .get('/movies/new', moviesController.new)
    .get('/movies/recommended', moviesController.recomended)
    .get('/movies/detail/:id', moviesController.detail)
    .get('/movies/add', moviesController.add)
    .post('/movies/create', createValidation, moviesController.create) 
    .get('/movies/edit/:id', moviesController.edit) 
    .put('/movies/update/:id', moviesController.update) 
    .get('/movies/delete/:id', moviesController.delete) 
    .delete('/movies/delete/:id', moviesController.destroy);
module.exports = router;