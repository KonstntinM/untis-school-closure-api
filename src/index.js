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
  WebuntisService.getClasses()
    .then(classes => {
      res.json(classes)
    })
    .catch(error => {
      res.status(404).json(error)
    })
})

app.get("/schoolEnd/:classId", async function (req, res, next) {
  WebuntisService.getSchoolEnd(req.params.classId)
    .then(schoolEnd => {
      res.send(schoolEnd)
    })
    .catch(error => {
      res.status(500).json(error)
    })
})

const port = config.Server[0].PORT || 8000
app.listen(port, () => {
  console.log("\x1b[32m" + "The server started successfully and listens to port " + "\x1b[33m" + port + "\x1b[32m" + "." + "\x1b[0m")
});