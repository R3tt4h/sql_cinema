const express = require('express')
const router = express.Router()

const movieController =   require('../controllers/movie.controller');

// Retrieve all movies
router.get('/', movieController.findAll);

// Create a new movie
router.post('/', movieController.create);

// Retrieve a single movie with id
router.get('/:id', movieController.findById);

// Update a employee with id
router.post('/:id', movieController.update);

// Delete a movie with id
router.get('/delete/:id', movieController.delete);

module.exports = router