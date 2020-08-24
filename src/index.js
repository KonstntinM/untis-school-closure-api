const express = require("express");
var app = express();

const untis = require("untis-api")

const config = require('yaml').parse(require('fs').readFileSync(__dirname + '/config/config.yaml', 'utf8'))

app.get("/", function(req, res) {
  res.json("Hello World from Express!");
});

const port = config.Server[0].PORT || 8000
app.listen(port, () => {
  console.log("\x1b[32m" + "The server started successfully and listens to port " + "\x1b[33m" + port + "\x1b[32m" + "." + "\x1b[0m")
});