require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const api = require("./routes/api");

app.get("/", (req, res) => res.send("Hello World!"));

app.use("/api",api);

const port = process.env.PORT ||5000; 

app.listen(port, () => console.log(`Example app listening on port ${port} !`));
