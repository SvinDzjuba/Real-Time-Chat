const WebSocket = require('ws');
const { WebSocketServer } = require('ws');
const http = require('http');
const express = require('express');
const session = require('node-sessionstorage');

// Configuring express server
const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', 'views');

const server = http.createServer(app);
const wss = new WebSocketServer({ server });
wss.on('connection', function connection(socket) {
    socket.on('message', function message(message) {
        const data = JSON.parse(message);
        if (data.type === 'message') {
            wss.clients.forEach(client => {
                if (client !== socket && client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ type: 'answer', data: data.data }));
                }
            })
        }
    });
});

const PORT = 3000 || process.env.PORT;
server.listen(PORT, () => {
    console.log(`\nServer started http://localhost:${PORT}`)
});

require('./routes.js')(app);