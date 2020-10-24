/**
 *Whenever a client connects , add its id to redis queue.
 When the client disconnects, delete its id from redis queue.
 When a client sends data to relay server with appropriate relayTo as websocket, broadcast to all connections.
 */




