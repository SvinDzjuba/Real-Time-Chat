const ws = new WebSocket('ws://localhost:3000');

ws.addEventListener('message', (e) => {
    const data = JSON.parse(e.data);
    if (data.type === 'message') {
        addMessage(data.data);
    } else if (data.type === 'answer') {
        renderMessage(data.data);
    }
});
document.getElementById('send').addEventListener('click', sendMessage);
document.getElementById('message').addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const message = document.getElementById('message');
    if (!message.value) return false;
    const user = sessionStorage.getItem('user');
    ws.send(JSON.stringify({ type: 'message', user: user, data: message.value }));
    addMessage(message.value);
    message.value = '';
}
function addMessage(message) {
    const chat = document.getElementById('chat-content');
    const container = document.createElement('div');
    const messageBody = document.createElement('div');
    const node = document.createElement('p');
    const nodeTime = document.createElement('p');

    // Get current time
    const date = new Date();
    let time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    nodeTime.innerHTML = time;
    nodeTime.classList.add('meta');

    // Add classes to elements
    let classes = ['media', 'media-chat', 'media-chat-reverse'];
    container.classList.add(...classes);
    messageBody.classList.add('media-body');

    // Append all DOM elements
    node.innerHTML = message;
    messageBody.appendChild(node);
    messageBody.appendChild(nodeTime);
    container.appendChild(messageBody);
    chat.appendChild(container);

    // Scroll to bottom
    chat.scrollTop = chat.scrollHeight;
}
function renderMessage(message) {
    const chat = document.getElementById('chat-content');
    const container = document.createElement('div');
    const messageBody = document.createElement('div');
    const node = document.createElement('p');
    const nodeTime = document.createElement('p');
    const nodeUser = document.createElement('p');

    // Get current time
    const date = new Date();
    let time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    nodeTime.innerHTML = time;
    nodeTime.classList.add('meta');
    const user = JSON.parse(sessionStorage.getItem('user'));
    nodeUser.innerHTML = user.username;

    // Add classes to elements
    let classes = ['media', 'media-chat'];
    container.classList.add(...classes);
    messageBody.classList.add('media-body');
    nodeUser.classList.add('username');

    // Append all DOM elements
    node.innerHTML = message;
    messageBody.appendChild(nodeUser);
    messageBody.appendChild(node);
    messageBody.appendChild(nodeTime);
    container.innerHTML = `<img class="avatar" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="...">`;
    container.appendChild(messageBody);
    chat.appendChild(container);

    // Scroll to bottom
    chat.scrollTop = chat.scrollHeight;
}