const WebSocket = require('ws');
const { WebSocketServer } = require('ws');
const http = require('http');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

// Configuring express server
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.set('view engine', 'ejs');
app.set('views', 'views');

// 24 hours
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: "thisismysecrctekeyfdgfduugh234jkhsdkfjhk2j3",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));

const server = http.createServer(app);
const wss = new WebSocketServer({ server });
const { onMessage } = require('./controllers/socket.controller');
wss.on('connection', function connection(socket) {
    socket.on('message', function (message) {
        onMessage(message, socket, wss);
    });
});

const PORT = 3000 || process.env.PORT;
server.listen(PORT, () => {
    console.log(`\n-- Server started http://localhost:${PORT} --`)
});

require('./routes.js')(app);