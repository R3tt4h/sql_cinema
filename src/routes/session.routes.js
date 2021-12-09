const express = require('express')
const router = express.Router()

const sessionController =   require('../controllers/session.controller');

// Retrieve all sessions
router.get('/', sessionController.findAll);

// Create a new session
router.post('/', sessionController.create);

// Retrieve a single session with id
router.get('/:id', sessionController.findById);

// Delete a session with id
router.get('/delete/:id', sessionController.delete);

module.exports = router