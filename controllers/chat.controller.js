exports.messenger = (req, res) => {
    const session = req.session;
    if (session.username === undefined || session.username === null) {
        res.redirect('/login');
    } else {
        res.render('messenger', {
            user: {
                username: session.username,
                avatar: session.avatar
            }
        });
    }
};
exports.chat = (req, res) => {
    const session = req.session;
    if (session.username === undefined || session.username === null) {
        res.redirect('/login');
    } else {
        res.render('chat', {
            user: {
                username: session.username,
                avatar: session.avatar
            }
        });
    }
};