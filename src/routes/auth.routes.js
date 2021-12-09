const express = require('express')
const router = express.Router()

const authController =   require('../controllers/auth.controller');

// login
router.get('/', authController.login);

// login 2
router.post('/', authController.login);

// logout
router.get('/logout', authController.logout);



module.exports = router