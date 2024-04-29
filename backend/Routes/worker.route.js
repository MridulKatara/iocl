const express = require('express');
const router = express.Router();
const workerController = require('../Controllers/worker.controller');
const authenticateAdmin = require('../middleware/authenticateAdmin');

router.post('/',authenticateAdmin, workerController.createWorker);
router.get('/',authenticateAdmin, workerController.getWorkers);

module.exports = router;
