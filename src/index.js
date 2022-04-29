/**
 *
 * Relay Server : Relays data posted by Pattern Capture to multiple destinations.
 * API:
 * POST /relay/:collectorId/:dependencyType/:dependencyId
 *  {
 *      data:"",
 *      relayTo:"string[]" <-- ["all"] by default,
 *      renderer: "string" <-- plain by default,
 *      relaySpecificParams:"object",
 *      rendererSpecificParams:"object"
 *  }
 *
 * */

var express = require("express");
var app = express();
var http = require("http").createServer(app);
const relayManager = require("./relayManager");
var bodyParser = require("body-parser");
require("dotenv").config()

//const config = process.env;
const config = require("./config.json");

const panelInfoServer = require("./panelinfoserver.js");

app.use(bodyParser.json());

const RELAY_PATH = "/relay/:collectorId/:dependencyType/:dependencyId", PING = '/ping';

app.get(PING, function(req, res) {
    res.send("pong");
});

app.use(RELAY_PATH, relayManager(config));

app.post(RELAY_PATH, (req, res) => {
    console.log("______");
    res.send(res.relayStatus);
});


http.listen(8086, function() {

    console.log("started");

});

panelInfoServer(config);



