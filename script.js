const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const name = prompt('what is your name')
appendmessage('You Joined')
socket.emit('new-user', name)

socket.on('chat-message', data => {
    appendmessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name   => {
    appendmessage(`${name} connected`)
})

socket.on('user-disconnected', name   => {
    appendmessage(`${name} disconnected`)
})


messageForm.addEventListener('submit',e=> {
    e.preventDefault()
    const message = messageInput.value
    appendmessage(`You: ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.value = ' '
})

function appendmessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}