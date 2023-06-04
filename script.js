const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const message = userInput.value;
    if (message.trim() !== '') {
        appendMessage('user', message);
        userInput.value = '';

        fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: message })
        })
        .then(response => response.json())
        .then(data => {
            appendMessage('bot', data.reply);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}

function appendMessage(sender, message) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message', sender);
    messageContainer.textContent = message;
    chatLog.appendChild(messageContainer);
    chatLog.scrollTop = chatLog.scrollHeight;
}
