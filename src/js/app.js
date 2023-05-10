import bcrypt from 'bcryptjs';

// All partials
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const chat = document.getElementById('chat');
// HREF buttons
const signUp = document.querySelector('.sign-up');
const signIn = document.querySelector('.sign-in');
const logout = document.querySelector('#logout');

// Login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const uname = loginForm.elements['uname'].value;
    const psw = loginForm.elements['psw'].value;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(psw, salt, (err, hash) => {
            if (err) {
                return console.log('Cannot encrypt!');
            }
            sessionStorage.setItem('user', JSON.stringify({
                username: uname,
                password: hash
            }));
            renderChatPage();
        });
    });
});
const cancel = document.querySelector('.cancel-btn');
cancel.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.reset();
});

// Register
registerForm.addEventListener('submit', () => {
    const uname = registerForm.elements['uname'].value;
    const psw = registerForm.elements['psw'].value;
    const pswRepeat = registerForm.elements['psw-repeat'].value;

    if (psw !== pswRepeat) {
        return console.log('Passwords do not match!');
    } else {
        console.log('You are successfully registered!');
    }
});

// Logout
logout.addEventListener('click', () => {
    sessionStorage.removeItem('user');
    renderLoginPage();
});


// Render page buttons
signUp.addEventListener('click', renderRegistrationPage);
signIn.addEventListener('click', renderLoginPage);

// Render functions
function renderRegistrationPage() {
    loginForm.classList.add('invisible');
    chat.classList.add('invisible');
    registerForm.classList.remove('invisible');
    loginForm.reset();
}
function renderLoginPage() {
    registerForm.classList.add('invisible');
    chat.classList.add('invisible');
    loginForm.classList.remove('invisible');
    registerForm.reset();
}
function renderChatPage() {
    loginForm.classList.add('invisible');
    registerForm.classList.add('invisible');
    chat.classList.remove('invisible');
    loginForm.reset();
    registerForm.reset();
}