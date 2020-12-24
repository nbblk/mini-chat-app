var clients = [];

const webSocketServerPort = 3001;
const WebSocketServer = require('websocket').server;
const http = require('http');

// HTTP server
const server = http.createServer((req, resp) => {});
server.listen(webSocketServerPort, () => console.log(`Server is listening on port ${webSocketServerPort}`));

// WebSocket server
wsServer = new WebSocketServer({ httpServer: server });

wsServer.broadcast = function (data) {
    clients.forEach((client) => {
        if (client.id !== data.id) {
            client.connection.send(JSON.stringify(data));
        }
    })
};

wsServer.on('request', req => {
    console.log('Connection from origin' + req.origin);

    const connection = req.accept(null, req.origin);
    clients.push(connection);
    console.log(clients.length);

    console.log(`Connection ${req.origin} accepted`);

    connection.on('message', data => {
        if (data.type === 'utf8') {
            const user = JSON.parse(data.utf8Data);
            
            clients.forEach(client => {
                client.send(JSON.stringify(user));
            });
        }
            // if (!clients) { 
            //     clients.push({ id: Math.random(), ...user, connection: connection });
            // } else {
            //     clients.forEach(client => {
            //         console.log(client);
            //         if (client.username !== user.username) {
            //             clients.push({ id: Math.random(), ...user, connection: connection });
            //         }
            //     })    
            // }
            // wsServer.broadcast(user);
            // }
    });

    connection.on('close', connection => {
        console.log(`Connection ${connection.remoteAddress} disconnected.`);
    });
});

