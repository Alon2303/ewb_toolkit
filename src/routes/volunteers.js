const express = require("express");
const router = express.Router();
const {auth} = require("../controllers/authentication/auth");

router.use((req, res, next) => auth(req, res, next))

router.post("/", (req, res) => res.jsonp(require("../mockDb")));

module.exports = router;
