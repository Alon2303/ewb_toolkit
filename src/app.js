const express = require("express");
const app = express();
const mockDb = require("./mockDb");
const {auth} = require("./authentication/auth");

app.use(express.json());
app.use(express.urlencoded());
const rc = require("./redis/redisController");
app.post("/", auth, (req, res) => res.json(mockDb))

app.listen(3000, () => console.log("App listenning..."))
