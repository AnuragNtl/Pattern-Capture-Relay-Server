var express = require("express");

const {buildSchema} = require("graphql");

let app = express();

var graphqlHttp = require("express-graphql").graphqlHTTP;
const cors = require("cors");

const registeredRelays = require("./registeredRelays.js");

var schema = buildSchema(`

type Status {
    status: Int!,
    message: String

}

type Pair {
    key: String,
    value: String
}

type Node {
    id: String,
    type: String, 
    dependencyId: String,
    deliversToNodes: [String]
    inputParams: [Pair]
}

type TokenResponse {
    token : String
}

type Query {
    getRegisteredPanelIds: [String],
    getCapturerIds: [String],
    getNodeDetails(collectorId:String, nodeId: String): Node
}

type Mutation {
    login(username:String, password: String) : TokenResponse
    addPanels(panelIds: [String]): Status
    removePanels(panelIds: [String]): Status
}

`);

const root = {
    getRegisteredPanelIds: () => {}
};


app.use("/graph", cors(), graphqlHttp({schema: schema, rootValue: root, graphiql: true}));

module.exports = ({panelInfo}) => app.listen(panelInfo.serverPort, (err) => console.log(err));


