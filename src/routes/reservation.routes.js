const express = require('express')
const router = express.Router()

const reservationController =   require('../controllers/reservation.controller');

// Retrieve all reservations
router.get('/', reservationController.findAll);

// Create a new reservation
router.post('/', reservationController.create);

// Delete a reservation with id
router.get('/delete/:id', reservationController.delete);

module.exports = router