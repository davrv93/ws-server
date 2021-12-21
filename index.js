const express = require('express');
const ws = require('ws');

const app = express();
const port = 5000;
// Set up a headless websocket server that prints any
// events that come in.
const wsServer = new ws.Server({ noServer: true });
wsServer.on('connection', socket => {
    socket.on('message', message => {

        wsServer.clients.forEach(function each(client) {
            if (client.readyState === ws.OPEN) {
                setTimeout(function () {
                    client.send(


                        Buffer.from(JSON.stringify({ "source": "server", "content": "response from server" }))

                        , { binary: false });
                }, 1000);


            }
        });

        console.log(message.toString());
    }
    );
});

// `server` is a vanilla Node.js HTTP server, so use
// the same ws upgrade process described here:
// https://www.npmjs.com/package/ws#multiple-servers-sharing-a-single-https-server
const server =

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    });

server.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, socket => {
        wsServer.emit('connection', socket, request);
    });
});