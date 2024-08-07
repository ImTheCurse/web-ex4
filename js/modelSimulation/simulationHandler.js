import { updateHeader } from '../header.js';
import { ZoomIn, ZoomOut, handleDropdownInputs } from './toolbarActions.js';
import { loadSimName } from './simulationInfo.js';
import { checkSessionID } from '../handleCatalogSearch.js';

document.addEventListener('DOMContentLoaded', function() {
    const simulationImg = document.getElementById('simulation-img');
    updateHeader();
    checkSessionID();
    loadSimName();
    if (simulationImg) {
        const imgURL = sessionStorage.getItem('model-url');
        if (imgURL) {
            simulationImg.style.backgroundImage = `url(${imgURL})`;
        } else {
            simulationImg.style.backgroundColor = 'gray';
        }
    }


});

document.getElementById('ZoomOut').addEventListener('click', () => {
    ZoomOut();
});

document.getElementById('ZoomIn').addEventListener('click', () => {
    ZoomIn();
});

document.getElementById('mobile-ZoomOut').addEventListener('click', () => {
    ZoomOut();
});

document.getElementById('mobile-ZoomIn').addEventListener('click', () => {
    ZoomIn();
});
document.getElementById('arrow-inputs').addEventListener('click', () => {
    handleDropdownInputs();
})
document.addEventListener('DOMContentLoaded', () => {
    const hoverController = document.getElementById('hoverController');
    const simulationArea = document.getElementById('simulation-area');
    let startX, startY, initialX, initialY;
    hoverController.addEventListener('dragstart', (e) => {
        startX = e.clientX;
        startY = e.clientY;
        const style = window.getComputedStyle(hoverController);
        const matrix = new WebKitCSSMatrix(style.transform);
        initialX = matrix.m41;
        initialY = matrix.m42;
    });

    simulationArea.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    simulationArea.addEventListener('drop', (e) => {
        e.preventDefault();
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        const newX = initialX + deltaX;
        const newY = initialY + deltaY;

        // Ensure the hoverController stays within the boundaries of the simulation area
        const boundedX = Math.max(0, Math.min(newX, simulationArea.offsetWidth - hoverController.offsetWidth));
        const boundedY = Math.max(0, Math.min(newY, simulationArea.offsetHeight - hoverController.offsetHeight));
        hoverController.style.transform = `translate(${boundedX}px, ${boundedY}px)`;
    });
});


