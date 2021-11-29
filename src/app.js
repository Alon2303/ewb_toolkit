const express = require("express");
const app = express();
const mockDb = require("./mockDb");
const router = express.Router();
const vlntrs = require("./routes/volunteers");

app.use(express.json());
app.use(express.urlencoded());

app.use("/vlntrs", vlntrs);


app.listen(3000, () => console.log("App listenning..."))
