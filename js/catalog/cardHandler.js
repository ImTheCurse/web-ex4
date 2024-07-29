
export async function displayCards(data) {

    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    let response = await fetch("https://final-web-cloud-proj-server.onrender.com/api/catalog", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());

    if (data != null) { response = data; }


    response.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const titleSpan = document.createElement('span');
        titleSpan.id = 'card-title-span';

        const img = document.createElement('img');
        img.src = item.model_image_url;
        img.alt = `Img_${item.ImgID}`;
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

        descSpan.innerHTML = `<img src="images/clock.svg" alt="clock"> ${item.created_at.slice(0, 10)}  <img src="images/views.svg" alt="Views"> ${item.views}  <img src="images/heart.svg" alt="Likes"> ${item.likes}`;

        cardBody.appendChild(titleSpan);
        cardBody.appendChild(descSpan);
        card.appendChild(cardBody);
        cardContainer.appendChild(card);
    });
}
