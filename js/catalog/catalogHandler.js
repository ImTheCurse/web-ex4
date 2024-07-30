import { updateHeader } from "../header.js";
import { displayCards } from "./cardHandler.js";
import { loadToSimulationFromView } from "./catalogInfo.js";
import { checkSessionID } from "../handleCatalogSearch.js";


document.addEventListener('DOMContentLoaded', async () => {
    updateHeader();
    checkSessionID();
    let catalogData = [];
    try {
        catalogData = await fetch("https://final-web-cloud-proj-server.onrender.com/api/catalog", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json());
    } catch (err) { }
    await displayCards();
    loadToSimulationFromView();
    initCardOnClick();
    const searchInput = document.getElementById('search_input');

    searchInput.addEventListener('input', async () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredData = catalogData.filter(item =>
            item.model_name.toLowerCase().includes(searchTerm) ||
            item.model_created_by.toLowerCase().includes(searchTerm)
        );

        await displayCards(await filteredData);
        initCardOnClick();
        removeDuplicates();
    });
});

function initCardOnClick() {
    const elems = document.getElementsByClassName('card');
    for (let i = 0; i < elems.length; i++) {
        const modelName = elems[i].getElementsByTagName('h3')[0].textContent;
        const modelID = elems[i].getElementsByTagName('h6')[0].textContent;
        const modelDate = elems[i].getElementsByTagName('img')[1].nextSibling.data.trim();
        const modelURL = elems[i].getElementsByTagName('img')[0].src;

        elems[i].addEventListener('click', () => {
            loadSessionVars(modelID, modelName, modelDate, modelURL);
            window.location.href = 'simulation.html';
        });
    }
}

function removeDuplicates() {
    const cardBodies = document.getElementsByClassName('card-body');
    let seenID = [];
    for (let i = 0; i < cardBodies.length; i++) {
        if (seenID.length === 0) {
            seenID.push(cardBodies[i].getElementsByTagName('h6')[0].textContent);
            continue;
        }
        if (seenID.includes(cardBodies[i].getElementsByTagName('h6')[0].textContent)) {
            const card = cardBodies[i].parentNode;
            card.remove();
            continue;
        }
        seenID.push(cardBodies[i].getElementsByTagName('h6')[0].textContent);
    }
}

function loadSessionVars(modelID, modelName, modelDate, modelURL) {
    sessionStorage.setItem('model-date', modelDate);
    sessionStorage.setItem('model-name', modelName);
    sessionStorage.setItem('model-url', modelURL);
    sessionStorage.setItem('model-id', modelID);
}
