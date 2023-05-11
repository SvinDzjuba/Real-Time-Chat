const session = require('node-sessionstorage');
const bcrypt = require('bcryptjs');
const { db } = require('../firebase.config');
const { ref, set, push, onValue } = require('firebase/database');

exports.login = (req, res) => {
    const dbRef = ref(db, '/users');
    onValue(dbRef, (snapshot) => {
        const users = snapshot.val();
        const user = Object.values(users).find(user => user.username === req.body.uname);
        if (user === undefined) {
            res.render('login', { error: 'Invalid username or password!' });
            return;
        }
        bcrypt.compare(req.body.psw, user.password, (err, result) => {
            if (err) {
                res.status(400).send({ message: 'Cannot decrypt!' });
                return;
            }
            if (!result) {
                res.render('login', { error: 'Invalid username or password!' });
                return;
            }
            session.setItem('user', {
                username: user.username,
            });
            res.redirect('/');
        });
    }, { onlyOnce: true });

    session.setItem('user', {
        username: req.body.uname,
    });
    res.redirect('/');
};
exports.register = (req, res) => {
    if (req.body.psw !== req.body.rsw - repeat) {
        res.render('register', { error: 'Passwords do not match!' });
        return;
    }
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.psw, salt, (err, hash) => {
            if (err) {
                res.status(400).send({ message: 'Cannot encrypt!' });
                return;
            }
            // Send to firebase database
            const usersListRef = ref(db, 'users');
            const newUserRef = push(usersListRef);
            set(newUserRef, {
                username: req.body.uname,
                password: hash
            });
            res.redirect('/login');
        });
    });
};