import { updateHeader } from "../header.js";
import { displayCards } from "./cardHandler.js";
import { loadToSimulationFromView } from "./catalogInfo.js";

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

            for (let i = 0; i < document.getElementsByTagName('img').length; i++) {
                if (event.target.tagName === 'DIV') {
                    const cardBody = event.target.getElementsByClassName('card-body')[i];
                    const img = cardBody.getElementsByTagName('img')[0];
                    if (img.alt.slice(4) == sessionStorage.getItem('model-img-id')) {
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
            sessionStorage.setItem('model-date', date);
            sessionStorage.setItem('model-name', title.textContent);
            window.location.href = `simulation.html?img=${imageUrl}`;
        }
    });
});


