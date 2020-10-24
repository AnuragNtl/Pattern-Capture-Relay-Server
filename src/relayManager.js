
const REGISTERED_RELAYS = require("./registeredRelays.js");

async function relayManager(req, res, next) {
    
    let collectorId = req.params.collectorId,
        dependencyType = req.params.dependencyType,
        dependencyId = req.params.dependencyId,
        relayToList = req.body.relayTo;
    var registeredRelays = REGISTERED_RELAYS.map(r => { return {...r, "id": r.id.toLowerCase()}});
    if(!relayToList || relayToList.length == 0) {
        relayToList = registeredRelays.map(r => r.id.toLowerCase());
    }
    var registeredRelaysMap = {};
    let status = [];
    for(i in registeredRelays) registeredRelaysMap[registeredRelays[i]["id"]] = registeredRelays[i];
    relayToList.forEach(relayTo => {

        relayTo = relayTo.toLowerCase();
        if(!registeredRelaysMap[relayTo]) {

            console.log("No relay found for id " + relayTo);
            return;
        } 


        status.push(registeredRelaysMap[relayTo].relay({collectorId, dependencyType, dependencyId, data: req.body.data, relayParams:req.body.relaySpecificParams, renderer: req.body.renderer, rendererParams: req.body.rendererSpecificParams}));
        
    });

    await Promise.all(status).then(details => {
        if(!res.relayStatus) {
            res.relayStatus = [];
        }
        res.relayStatus.push(details);
    });



    next();
    
}


module.exports = relayManager;

