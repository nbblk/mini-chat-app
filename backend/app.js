var clients = [];

const webSocketServerPort = 3001;
const WebSocketServer = require('websocket').server;
const http = require('http');

// HTTP server
const server = http.createServer((req, resp) => {});
server.listen(webSocketServerPort, () => console.log(`Server is listening on port ${webSocketServerPort}`));

// WebSocket server
wsServer = new WebSocketServer({ httpServer: server });

wsServer.on('request', req => {
    console.log('Connection from origin' + req.origin);

    const connection = req.accept(null, req.origin);

    console.log(`Connection ${req.origin} accepted`);

    connection.on('message', data => {
        if (data.type === 'utf8') {
            // save
            console.log(data);
            wsServer.broadcast(data);
            }
    });

    connection.on('close', connection => {
        console.log(`Connection ${connection.remoteAddress} disconnected.`);
    });
});

