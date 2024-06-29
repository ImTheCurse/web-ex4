import {updateHeader} from './js_header.js';
document.addEventListener('DOMContentLoaded', function() {
    
    const simulationImg = document.getElementById('simulation-img');
    updateHeader(); 
    if (simulationImg) {
        function getQueryParameter(name) {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(name);
        }

        const imageUrl = getQueryParameter('img');
        loadSimName();
        if (imageUrl) {
            simulationImg.style.backgroundImage = `url(${imageUrl})`;
        } else {
            simulationImg.style.backgroundColor = 'gray'; 
            console.error('Image URL not found in query parameters');
        }
    } else {
        console.error('Element with ID "simulation-img" not found');
    }
});

function ZoomIn() {
    let imgH= document.getElementById("simulation-img");
    imgH.style.transform = "scale(1.5)";
    imgH = imgH.style.transform;
}

function ZoomOut() {
    let imgH= document.getElementById("simulation-img");
    imgH.style.transform = "scale(0.5)";    
}

function handleDropdownInputs(){
    const inputs = document.getElementById('inputs_area');
    const btn = document.getElementById('sim-btn');
    const sidebar = document.getElementById('sim-sidebar-inputs');
    if(inputs.style.display == 'none' || inputs.style.display == ''){
        inputs.style.display = 'block';
        sidebar.style.height = '500px';
        sidebar.style.marginTop = '-20vh';
    }
    else{
        inputs.style.display = 'none';
        sidebar.style.height = '200px';
    }
   }

document.getElementById('ZoomOut').addEventListener('click', ()=>{
    ZoomOut();
});
document.getElementById('ZoomIn').addEventListener('click', () => {
    ZoomIn();
});
document.getElementById('arrow-inputs').addEventListener('click', ()=>{
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

  function loadSimName()
  {
    const titleName = sessionStorage.getItem('model-name');
    const date = sessionStorage.getItem('model-date');
    const fullTitle = titleName + `, ${date}`;
    const contentArea = document.getElementById('simulation-area');
    const titleElem = document.createElement('h2');
    titleElem.textContent = fullTitle;
    contentArea.insertBefore(titleElem,contentArea.firstChild);
  }
