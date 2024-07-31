
import { checkSessionID } from '../handleCatalogSearch.js'

document.addEventListener('DOMContentLoaded', () => {
    displayMessages();
})

async function displayMessages() {
    const id = await checkSessionID();
    const response = await fetch('https://final-web-cloud-proj-server.onrender.com/api/messages/recieve', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ reciever_id: id })
    }).then(res => res.json());

    for (let i = 0; i < response.length; i++) {
        const message = document.createElement('div')
        message.addEventListener('mouseover', () => {
            message.style.backgroundColor = 'LightGray'
            message.style.borderRadius = '5px';
        })

        message.addEventListener('mouseout', () => {
            message.style.backgroundColor = 'white';
        })

        message.addEventListener('click', () => {
            document.getElementById('report-user-name').innerHTML = `message to ${response[i].name}`;
            document.getElementById('modal-text-input').style.borderRadius = 0;
            sessionStorage.setItem('modal-message-senderID', response[i].sender_id);
            sessionStorage.setItem('modal-message-recieverID', response[i].reciever_id);
            sessionStorage.setItem('modal-message', response[i].message);
        })

        message.setAttribute('data-bs-toggle', "modal");
        message.setAttribute('data-bs-target', '#staticBackdrop');

        const title = document.createElement('h5');
        const messageContent = document.createElement('h6');
        const line = document.createElement('hr');
        const btn = document.createElement('btn');

        title.textContent = `Sent by ${response[i].name}`;
        messageContent.textContent = response[i].message;

        message.appendChild(title);
        message.appendChild(messageContent);
        message.appendChild(line);
        message.style.marginLeft = '50px';


        document.getElementsByClassName('card-body')[0].appendChild(message);

    }

    const messageAmount = document.getElementById('badge').textContent = response.length;
}

document.getElementById('modal-send-btn').addEventListener('click', async () => {
    const message = document.getElementById('modal-text-input').value;
    const recv_id = sessionStorage.getItem('modal-message-recieverID');
    const send_id = sessionStorage.getItem('modal-message-senderID');

    const response = await fetch('https://final-web-cloud-proj-server.onrender.com/api/messages/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            reciever_id: send_id,
            sender_id: recv_id,
            message: message
        })
    });
    if (response.status == 200) {
        alert('Sent message.');
    } else {
        alert("error: could'nt send message.");
    }
})




