const ws = new WebSocket(`ws://localhost:3000`);

ws.addEventListener('message', (e) => {
    const data = JSON.parse(e.data);
    if (data.type === 'message' || data.type === 'answer') {
        addMessage(data);
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
    const messageEntity = {
        type: 'message',
        user: user,
        data: message.value,
    };
    ws.send(JSON.stringify(messageEntity));
    addMessage(messageEntity);
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

    if (message.type === 'answer') {
        const nodeUser = document.createElement('a');
        const user = JSON.parse(message.user);
        nodeUser.innerHTML = user.username;
        nodeUser.classList.add('username');
        nodeUser.href = `/user/${user.username}`;

        // Append all DOM elements
        node.innerHTML = message.data;
        messageBody.appendChild(nodeUser);
        messageBody.appendChild(node);
        messageBody.appendChild(nodeTime);
        container.innerHTML = `<img class="avatar" src="${user.avatar}" alt="${user.username}">`;
        container.appendChild(messageBody);
        chat.appendChild(container);

        // Add classes to elements
        let classes = ['media', 'media-chat'];
        container.classList.add(...classes);
        messageBody.classList.add('media-body');
        nodeUser.classList.add('username');
    } else {
        let classes = ['media', 'media-chat', 'media-chat-reverse'];
        container.classList.add(...classes);
        messageBody.classList.add('media-body');

        // Append all DOM elements
        node.innerHTML = message.data;
        messageBody.appendChild(node);
        messageBody.appendChild(nodeTime);
        container.appendChild(messageBody);
        chat.appendChild(container);
    }

    // Scroll to bottom
    chat.scrollTop = chat.scrollHeight;
}