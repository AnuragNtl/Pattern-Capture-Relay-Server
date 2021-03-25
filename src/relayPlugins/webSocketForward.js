/**
 *Whenever a client connects , add its id to redis queue.
 When the client disconnects, delete its id from redis queue.
 When a client sends data to relay server with appropriate relayTo as websocket, broadcast to all connections.
 */


const redis = require("redis"); //* [redis[s]:]//[[user][:password@]][host][:port][/db-number][?db=db-number[&password=bar[&option=value]]]\
const {promisify} = require("util");

const io = require("socket.io");



class WebSocketRelay {

    constructor(config) {

        let express = require("express");
        let app = express();
        this.http = require("http").createServer(app);
        this.io = require("socket.io")(this.http);
        this.config = config;
        this.client = redis.createClient(config.REDIS_URL);
        this.client.on("error", (error) => {
            console.log(error);
        });
        this.hset = promisify(this.client.hset);
        this.hget = promisify(this.client.hget);
        this.hdel = promisify(this.client.hdel);
        this.onConnection();
    }

    onConnection() {
        this.io.on("connection", (socket) => {
            console.log("client connected " + socket.id);
            this.registerHandlers(socket);
        });
    }

    registerHandlers(socket) {

        this.handleRegister(socket);
        this.handleDisconnect(socket);

    }

    getRegisteredEntries(reply, value) {
        reply = this.generateEntries(getEntries(reply).push(value));
        return reply;
    }

    handleRegister(socket) {
        socket.on("register", ({type}) => {
            this.hget("types", type)
                .then(reply => this.getRegisteredEntries(reply, socket.id))
                .then(reply => this.hset("types", type, reply))
                .then(() => this.hset("connections", socket.id, type))
                .catch(e => {throw e});
        });
    }

    getEntries(reply) {
        if(!reply) reply = "";
        return reply.split(',').map(id => id.trim());
    }

    generateEntries(entryList) {
        return entryList.join(',');
    }

    removeFromEntries(reply, value) {
        reply = this.getEntries(reply);
        reply.splice(reply.indexOf(value), 1);
        reply = this.generateEntries(reply);
        return reply;
    }

    handleDisconnect(socket) {

        socket.on('disconnect', async function() {
            let type = await this.hget("connections", socket.id);
            this.hget("types", type)
            .then(reply => this.removeFromEntries(reply, type))
            .then(reply => this.hset("types", type, reply))
            .then(() => this.hdel("connections", socket.id))
            .catch(e => {throw e});
        });

    }

    startServer() {
        const port = this.config.WEBSOCKET_RELAY_PORT;
        this.http.listen(port, (err) => {
            if(!err)
                console.log("started websockets server at port " + port);
            else
                throw err;
        });
    }

    emitChannelEvent(channelType, event, data) {
        this.hget("types", channelType)
            .then(reply => this.getEntries(reply))
            .then(entries => entries.forEach(entry => {
                if(this.io.sockets.connected[entry]) {
                    this.io.sockets.connected[entry].emit(event, data);
                }
            }));
    }

};


var server;

module.exports = {

    id: "webSocketRelay",
    relay: async ({data, relayParams}) => {
        const {channelType, channelEvent} = relayParams;
        server.emitChannelEvent(channelType, channelEvent, data);
    },
    init: (config) => {
        server = new WebSocketRelay(config);
        server.startServer();
    }
}





