
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

        // const cardUserId = document.createElement('h6');
        // cardUserId.id = 'card-user-id';
        // cardUserId.style.display = 'none';
        // cardUserId.textContent = item.user_id;
        // cardBody.appendChild(cardUserId);

        const fileName = location.href.split("/").slice(-1)[0];
        if (fileName == 'catalogAdmin.html') 
        {
            const warningIcon = document.createElement('div');
            warningIcon.id = 'warning-icon';
            warningIcon.className = "btn btn-primary";
            warningIcon.setAttribute('data-bs-toggle',"modal");
            warningIcon.setAttribute('data-bs-target',"#staticBackdrop");
            warningIcon.addEventListener('click', ()=> {
                document.getElementById('report-user-name').innerHTML = "Message to " + item.model_created_by;
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
