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
const relayManager = require("./relayManager");
var bodyParser = require("body-parser");
app.use(bodyParser.json());

const RELAY_PATH = "/relay/:collectorId/:dependencyType/:dependencyId";

app.use(RELAY_PATH, relayManager);

app.post(RELAY_PATH, (req, res) => {
    console.log("______");
    res.send(res.relayStatus);
});


app.listen(8086, function() {

    console.log("started");

});




