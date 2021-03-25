const fs = require("fs");
const RELAY_PLUGIN_PATH = "./relayPlugins/";
const REGISTERED_RELAYS = fs.readdirSync(RELAY_PLUGIN_PATH)
    .map(relayPlugin => require(RELAY_PLUGIN_PATH + relayPlugin));

const config = process.env;
console.log("registering relays");
REGISTERED_RELAYS.forEach(relay => {
    if(relay.init) {
        relay.init(config);
    }
});


module.exports = REGISTERED_RELAYS;

