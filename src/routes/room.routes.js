const express = require('express')
const router = express.Router()

const roomController =   require('../controllers/room.controller');

// Retrieve all rooms
router.get('/', roomController.findAll);

// Retrieve a single room with id
router.get('/:id', roomController.findById);

module.exports = router