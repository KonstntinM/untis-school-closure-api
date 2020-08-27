const express = require("express");
var app = express();

const config = require("config-yaml")(`${__dirname}/config/config.yaml`)

const WebUntis = require("webuntis");
const WebuntisService = require("./services/WebuntisService");

WebuntisService.login()

app.get("/", function(req, res) {
  res.json("Hello World from Express!");
});

app.get("/classes", function (req, res, next) {
  untis.getClasses()
    .then(result => {
      res.json(result)
    })
    .catch(error=> {
      const errorClasses = {
        "error": {
          "message": "Oops! There was an error when retrieving the classes."
        }
      }
      res.status(500).json(errorClasses)
    })
})

app.get("/schoolEnd/:classId", async function (req, res, next) {
  
})

const port = config.Server[0].PORT || 8000
app.listen(port, () => {
  console.log("\x1b[32m" + "The server started successfully and listens to port " + "\x1b[33m" + port + "\x1b[32m" + "." + "\x1b[0m")
});