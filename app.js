const message = document.querySelector('.message');
const input = document.querySelector('.input');
const button = document.querySelector('.add');
const state = document.querySelector('.status');
const form = document.querySelector('.message__container');
const userLogin = prompt('Ваше имя: ');

const ws = new WebSocket('ws://localhost:3000');

let messageStorage = [];

function setStatus(value) {
    state.innerHTML = value;
};

button.addEventListener('click', () => {
    if (!input.value) return;
    let messageBlock = {
        login: userLogin, 
        text: input.value
    };
    messageStorage.push(messageBlock);
    addMessage();
    
    input.value = '';
});

function addMessage() { 
    let storageMessage = `<li>${userLogin + ':'} ${input.value}</li>`;
    message.innerHTML += storageMessage;
    
    console.log(storageMessage)
};

button.addEventListener('click', () => {
    ws.send(input.value);
});

// form.addEventListener('submit', (event) => {
//     event.preventDefault();
//     ws.send(input.value);
// });

ws.onopen = () => setStatus('Online');
ws.onclose = () => setStatus('Disconnected');
ws.onmessage = (response) => addMessage(response.data);