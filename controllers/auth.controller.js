const bcrypt = require('bcryptjs');
const { db, avatarsRef } = require('../firebase.config');;

exports.login = (req, res) => {
    const { ref, onValue } = require('firebase/database');
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
                res.render('login', { error: 'Cannot decrypt!' });
                return;
            }
            if (!result) {
                res.render('login', { error: 'Invalid username or password!' });
                return;
            }
            const session = req.session;
            session.username = user.username;
            session.avatar = user.avatar;
            res.redirect('/');
        });
    }, { onlyOnce: true });
};
exports.register = (req, res) => {
    const { set, push } = require('firebase/database');
    const { uploadBytes, getDownloadURL } = require('firebase/storage');

    if (req.body.psw !== req.body.pswRepeat) {
        res.render('registration', { error: 'Passwords do not match!' });
        return;
    }

    // Send image to firebase storage
    const { avatar } = req.files;
    const { ref } = require("firebase/storage");
    const storageRef = ref(avatarsRef, avatar.name);
    uploadBytes(storageRef, avatar.data, { contentType: avatar.mimetype })
        .then(() => {
            getDownloadURL(storageRef, avatar.name)
                .then(url => {
                    if (url != '') {
                        bcrypt.genSalt(10, (err, salt) => {
                            const { ref } = require("firebase/database");
                            bcrypt.hash(req.body.psw, salt, (err, hash) => {
                                if (err) {
                                    res.render('registration', { error: 'Cannot encrypt!' });
                                    return;
                                }
                                // Send to firebase database
                                const usersListRef = ref(db, 'users');
                                const newUserRef = push(usersListRef);
                                set(newUserRef, {
                                    username: req.body.uname,
                                    password: hash,
                                    avatar: url
                                });
                                res.redirect('/login');
                            });
                        });
                    }
                });
        });
};