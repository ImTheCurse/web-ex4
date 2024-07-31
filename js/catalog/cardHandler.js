import { checkSessionID } from "../handleCatalogSearch.js";

export async function displayCards(data) {
    let response;
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    if (data == null) {
        response = await fetch("https://final-web-cloud-proj-server.onrender.com/api/catalog", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json());
    }
    if (data != null) { response = data; }

    response.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const fileName = location.href.split("/").slice(-1)[0];
        if (fileName == 'catalogAdmin.html') {
            const warningIcon = document.createElement('div');
            warningIcon.id = 'warning-icon';
            warningIcon.className = "btn btn-primary";
            warningIcon.setAttribute('data-bs-toggle', "modal");
            warningIcon.setAttribute('data-bs-target', "#staticBackdrop");
            warningIcon.addEventListener('click', async () => {
                document.getElementById('report-user-name').innerHTML = "Message to " + item.model_created_by;
                sessionStorage.setItem('modal-senderID', item.user_id);
                const recv_id = await checkSessionID();
                sessionStorage.setItem('modal-recieverID', await recv_id);
            })
            warningIcon.style.border = "white";
            warningIcon.style.backgroundColor = "white";
            warningIcon.style.position = "absolute";
            warningIcon.style.marginLeft = "0px";
            cardBody.appendChild(warningIcon);
        }

        const titleSpan = document.createElement('span');
        titleSpan.id = 'card-title-span';

        const img = document.createElement('img');
        img.src = item.model_image_url;
        img.alt = `IMG`;
        titleSpan.appendChild(img);

        const title = document.createElement('h3');
        title.className = 'card-title';
        title.textContent = item.model_name;

        const creator = document.createElement('h6');
        creator.textContent = `By ${item.model_created_by}`;

        titleSpan.appendChild(title);
        titleSpan.appendChild(creator);

        const descSpan = document.createElement('span');
        descSpan.className = 'span-desc';

        const id = document.createElement('h6');
        id.id = 'card-model-id';
        id.style.display = 'none';
        id.textContent = item.model_id;

        descSpan.innerHTML = `<img src="images/clock.svg" alt="clock"> ${item.created_at.slice(0, 10)}  <img src="images/views.svg" alt="Views"> ${item.views}  <img src="images/heart.svg" alt="Likes"> ${item.likes}`;

        cardBody.appendChild(id);
        cardBody.appendChild(titleSpan);
        cardBody.appendChild(descSpan);
        card.appendChild(cardBody);
        cardContainer.appendChild(card);
    });
}
if (document.getElementById('modal-text-btn')) {
    document.getElementById('modal-text-btn').addEventListener('click', async () => {
        const message = document.getElementById('modal-text-input').value;
        const recv_id = sessionStorage.getItem('modal-recieverID');
        const send_id = sessionStorage.getItem('modal-senderID');

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

}

