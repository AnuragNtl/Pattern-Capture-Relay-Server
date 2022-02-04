const fs = require("fs");
const RELAY_PLUGIN_PATH = "./relayPlugins/";

function getRegisteredRelays(config) {
    const REGISTERED_RELAYS = fs.readdirSync(RELAY_PLUGIN_PATH)
        .map(relayPlugin => require(RELAY_PLUGIN_PATH + relayPlugin));
    console.log("registering relays");
    REGISTERED_RELAYS.forEach(relay => {
        if(relay.init) {
            relay.init(config);
        }
    });
    return REGISTERED_RELAYS;
}


module.exports = getRegisteredRelays;

