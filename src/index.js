const express = require("express");
var app = express();

const config = require('yaml').parse(require('fs').readFileSync(__dirname + '/config/config.yaml', 'utf8'))

const untis = require("untis-api")

untis.connect(config.Untis[2].USERNAME, config.Untis[3].PASSWORD, config.Untis[1].SCHOOL, config.Untis[0].SERVER)
    .then(res => {
        console.info("\x1b[32m" + "The server successfully opened a connection to the Untis server." + "\x1b[0m")
    })
    .catch(err => {
        console.error("Oops! There was an error when connecting to the Untis server. Please check your internet connection and login data.")
    })

app.get("/", function(req, res) {
  res.json("Hello World from Express!");
});

const port = config.Server[0].PORT || 8000
app.listen(port, () => {
  console.log("\x1b[32m" + "The server started successfully and listens to port " + "\x1b[33m" + port + "\x1b[32m" + "." + "\x1b[0m")
});