const session = require('node-sessionstorage');
const bcrypt = require('bcryptjs');

module.exports = function (app) {
    app.get('/', (req, res) => {
        if (session.getItem('user') === undefined || session.getItem('user') === null) {
            res.redirect('/login');
        } else {
            res.render('chat', { user: session.getItem('user') });
        }
    });
    app.get('/login', (req, res) => {
        res.render('login');
    });
    app.post('/login', (req, res) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.psw, salt, (err, hash) => {
                if (err) {
                    return console.log('Cannot encrypt');
                }
                session.setItem('user', {
                    username: req.body.uname,
                    password: hash
                });
                res.redirect('/');
            });
        });
    });
}