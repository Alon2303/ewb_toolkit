const express = require('express');
const router = express.Router();
const logger = require('../../utils/logger/logger');
const { authUser } = require('../controllers/auth');

router.get('/authUser', async (req, res, next) => {
    await authUser(req, res);
})


module.exports = router;