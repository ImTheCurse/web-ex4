
export function displayCards(data) {

    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    data.forEach(item => {
        console.log('GET {domain}/model_name');
        console.log('GET {domain}/model_image');
        console.log('GET {domain}/model_date');
        console.log('GET {domain}/model_likes');
        console.log('GET {domain}/model_views');
        console.log('GET {domain}/model_creator_name');

        const card = document.createElement('div');
        card.className = 'card';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const titleSpan = document.createElement('span');
        titleSpan.id = 'card-title-span';

        const img = document.createElement('img');
        img.src = `images/Img_${item.ImgID}.svg`;
        img.alt = `Img_${item.ImgID}`;
        titleSpan.appendChild(img);

        const title = document.createElement('h3');
        title.className = 'card-title';
        title.textContent = item.name;

        const creator = document.createElement('h6');
        creator.textContent = `By ${item.creator_name}`;

        titleSpan.appendChild(title);
        titleSpan.appendChild(creator);

        const descSpan = document.createElement('span');
        descSpan.className = 'span-desc';

        descSpan.innerHTML = `<img src="images/clock.svg" alt="clock"> ${item.date}  <img src="images/views.svg" alt="Views"> ${item.views}  <img src="images/heart.svg" alt="Likes"> ${item.likes}`;

        cardBody.appendChild(titleSpan);
        cardBody.appendChild(descSpan);
        card.appendChild(cardBody);
        cardContainer.appendChild(card);
    });
}
