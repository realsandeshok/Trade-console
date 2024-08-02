// routes/accountRoutes.js
const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

// Route to get all accounts
router.get('/', accountController.getAccounts);
// Route to add a new account
router.post('/', accountController.addAccount);
module.exports = router;
