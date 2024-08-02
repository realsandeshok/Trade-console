const express = require('express');
const router = express.Router();
const scriptController = require('../controllers/scriptController');

// Route to get all scripts
router.get('/', scriptController.getScripts);

// Route to add a new script
router.post('/', scriptController.addScript);

module.exports = router;
