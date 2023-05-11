const session = require('node-sessionstorage');

exports.chat = (req, res) => {
    if (session.getItem('user') === undefined || session.getItem('user') === null) {
        res.redirect('/login');
    } else {
        res.render('chat', { user: session.getItem('user') });
    }
};