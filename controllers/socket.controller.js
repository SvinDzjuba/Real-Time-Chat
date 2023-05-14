const WebSocket = require('ws');

exports.onMessage = function (message, socket, wss) {
    const data = JSON.parse(message);
    if (data.type === 'message') {
        wss.clients.forEach(client => {
            console.log(client);
            if (client !== socket && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(
                    { type: 'answer', data: data.data, user: data.user }
                ));
            }
        })
    }
};