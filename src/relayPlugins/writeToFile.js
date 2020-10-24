var fs = require("fs");



module.exports = {
    id:"writeToFile",
    relay: async ({data, relayParams}) => {
        const {fileName} = relayParams;
        fs.appendFileSync(fileName, data.raw);
        return "File written";
    }
};

