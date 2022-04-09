const express = require('express');
const router = express.Router();
const { getUser } = require('../../auth/db/users');


router.get('/getUser', async (req, res) => {
    await getUser(req, res);
})

module.exports = router