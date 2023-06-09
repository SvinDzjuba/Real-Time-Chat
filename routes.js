const chatController = require('./controllers/chat.controller');
const authController = require('./controllers/auth.controller');

module.exports = function (app) {
    app.get('/', chatController.messenger);
    app.get('/chat', chatController.chat);

    app.get('/login', (req, res) => {
        res.render('login');
    });
    app.post('/login', authController.login);

    app.get('/logout', (req, res) => {
        req.session.destroy();
        res.redirect('/login');
    });

    app.get('/register', (req, res) => {
        res.render('registration');
    });
    app.post('/register', authController.register);
}