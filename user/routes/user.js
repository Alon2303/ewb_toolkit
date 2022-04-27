const express = require('express');
const router = express.Router();
const { getUser } = require('../controllers/user');


router.get('/getUser', async (req, res) => {
    await getUser(req, res);
})

router.get('/createUser', async (req, res) => {
    await createUser(req, res);
})

router.get('/deleteUser', async (req, res) => {
    await deleteUser(req, res);
})

router.get('/updateUser', async (req, res) => {
    await updateUser(req, res);
})

module.exports = router