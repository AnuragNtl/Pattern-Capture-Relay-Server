
const getRegisteredRelays = require("./registeredRelays.js");
const {InvalidPayload} = require("./error.js");

let registeredRelays = null, registeredRelaysMap;

function initializeRelays(config) {
    registeredRelays = !registeredRelays ? getRegisteredRelays(config) : registeredRelays;
    registeredRelays = registeredRelays.map(r => { return {...r, "id": r.id.toLowerCase()}});
    registeredRelaysMap = {};
    for(i in registeredRelays) registeredRelaysMap[registeredRelays[i]["id"]] = registeredRelays[i];
}

function relayManager(config) {
    initializeRelays(config);
    return async (req, res, next) => {
        let collectorId = req.params.collectorId,
            dependencyType = req.params.dependencyType,
            dependencyId = req.params.dependencyId,
            nodeGraph = req.params.nodeGraph,
            relayToList = req.body.relayTo;
        if(!(collectorId && dependencyType && dependencyId && nodeGraph)) {
            next();
            throw InvalidPayload("collectorId, dependencyType, dependencyId, nodeGraph mandatory");
        }
        if(!relayToList || relayToList.length == 0) {
            relayToList = registeredRelays.map(r => r.id.toLowerCase());
        }
        let status = [];
        relayToList.forEach(relayTo => {

            relayTo = relayTo.toLowerCase();
            if(!registeredRelaysMap[relayTo]) {

                next();
                throw InvalidPayload("No relay found for id " + relayTo);
            } 


            status.push(registeredRelaysMap[relayTo].relay({collectorId, nodeGraph, dependencyType, dependencyId, data: req.body.data, relayParams:req.body.relaySpecificParams, renderer: req.body.renderer, rendererParams: req.body.rendererSpecificParams}));

        });

        await Promise.all(status).then(details => {
            if(!res.relayStatus) {
                res.relayStatus = [];
            }
            res.relayStatus.push(details);
        });



        next();

    };
}


module.exports = relayManager;

