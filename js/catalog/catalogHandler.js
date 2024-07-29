import { updateHeader } from "../header.js";
import { displayCards } from "./cardHandler.js";
import { loadToSimulationFromView } from "./catalogInfo.js";
import { checkSessionID } from "../handleCatalogSearch.js";


document.addEventListener('DOMContentLoaded', async () => {
    checkSessionID();
    const catalogData = await fetch("https://final-web-cloud-proj-server.onrender.com/api/catalog", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());

    displayCards();
    loadToSimulationFromView();

    const searchInput = document.getElementById('search_input');

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredData = catalogData.filter(item =>
            item.model_name.toLowerCase().includes(searchTerm) ||
            item.model_created_by.toLowerCase().includes(searchTerm)
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


