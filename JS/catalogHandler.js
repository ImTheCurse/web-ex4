import { updateHeader } from "./js_header.js";

document.addEventListener('DOMContentLoaded', () => {
    let catalogData = [];
    fetch('./data/catalog.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            catalogData = data.catalog_data;
            displayCards(catalogData);
            loadToSimulationFromView();
        })
        .catch(error => console.error('Error fetching catalog data:', error));

    function displayCards(data) {
        
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

    const searchInput = document.getElementById('search_input');

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredData = catalogData.filter(item =>
            item.name.toLowerCase().includes(searchTerm) ||
            item.creator_name.toLowerCase().includes(searchTerm)
        );
        displayCards(filteredData);
    });
});



document.addEventListener('DOMContentLoaded', function() {
    const imageContainer = document.getElementById('card-container');
    updateHeader();
    
    imageContainer.addEventListener('click', function(event) {
        
        if (event.target.tagName === 'IMG' || event.target.tagName === 'DIV') {
            
            let imageUrl = event.target.src;
            let titleSpan = event.target.parentNode;

            for(let i = 0;i<document.getElementsByTagName('img').length;i++){
                if(event.target.tagName === 'DIV'){
                    const cardBody = event.target.getElementsByClassName('card-body')[i];
                    const img = cardBody.getElementsByTagName('img')[0];
                    if(img.alt.slice(4) == sessionStorage.getItem('model-img-id')){
                        imageUrl = img.src;
                        titleSpan = cardBody.getElementsByTagName('span')[0];
                        break;
                    }
                    continue;
                }
                break;
            }
            const title = titleSpan.getElementsByTagName('h3')[0];
            const cardBody = titleSpan.parentNode;

            const date = cardBody.getElementsByClassName('span-desc')[0].outerHTML.split('|')[0].split('>')[2].trim();
            sessionStorage.setItem('model-date',date);
            sessionStorage.setItem('model-name',title.textContent);
            window.location.href = `simulation.html?img=${imageUrl}`;
        }
    });
});

function loadToSimulationFromView(){
    if(sessionStorage.getItem('model-available-from-view') !== 'true'){
        return;
    }
    const imgID = sessionStorage.getItem('model-image-id');
    for(let i = 0;i < document.getElementsByClassName('card-body').length;i++){
        const cardBody = document.getElementsByClassName('card-body')[i];
        const cardContainer = cardBody.parentNode.parentNode;
        const titleSpan = cardBody.getElementsByTagName('span')[0];
        const image = titleSpan.getElementsByTagName('img')[0];
        const imageAlt = image.alt;
        const currentImageID = imageAlt.slice(4);
        if(currentImageID == imgID){
            const event = new Event('click');
            cardContainer.dispatchEvent(event);
            sessionStorage.removeItem('model-available-from-view');
            sessionStorage.setItem('model-img-id',imgID.toString());
            return;
        }
    }
}

