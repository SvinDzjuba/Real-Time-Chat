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