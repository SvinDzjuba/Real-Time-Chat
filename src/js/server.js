import WebSocket, { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 1234 });
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
    ws.on('close', function () {
        clients.delete(ws);
    });
});