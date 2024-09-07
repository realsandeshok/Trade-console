const express = require('express');
const router = express.Router();
const trans = require('../models/TransactionModel');

// Route to get all scripts
router.get('/', trans.getAllTransactions);


module.exports = router;
