document.addEventListener('DOMContentLoaded', function() {
    const simulationImg = document.getElementById('simulation-img');
    
    if (simulationImg) {
        function getQueryParameter(name) {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(name);
        }

        const imageUrl = getQueryParameter('img');
        console.log(imageUrl);
        if (imageUrl) {
            console.log('Setting background image to:', imageUrl);
            simulationImg.style.backgroundImage = `url(${imageUrl})`;
        } else {
            simulationImg.style.backgroundColor = 'gray'; // Fallback background color
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
        // btn.style.marginTop = '10px';
        sidebar.style.height = '500px';
        sidebar.style.marginTop = '-20vh';
    }
    else{
        inputs.style.display = 'none';
        sidebar.style.height = '200px';
    }
   }

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


//-----------------------------------------------------------------------------------


// document.addEventListener('DOMContentLoaded', () => {
//     const hoverController = document.getElementById('hoverController');
//     const simulationArea = document.getElementById('simulation-area');
//     const sidebar = document.getElementById('sim-sidebar-inputs');
  
//     let startX, startY, initialX, initialY;
  
//     hoverController.addEventListener('dragstart', (e) => {
//       startX = e.clientX;
//       startY = e.clientY;
//       const style = window.getComputedStyle(hoverController);
//       const matrix = new WebKitCSSMatrix(style.transform);
//       initialX = matrix.m41;
//       initialY = matrix.m42;
//     });
  
//     simulationArea.addEventListener('dragover', (e) => {
//       e.preventDefault();
//     });
  
//     simulationArea.addEventListener('drop', (e) => {
//       e.preventDefault();
//       const rect = simulationArea.getBoundingClientRect();
//       const sidebarRect = sidebar.getBoundingClientRect();
//       const offsetX = e.clientX - rect.left - hoverController.offsetWidth / 2;
//       const offsetY = e.clientY - rect.top - hoverController.offsetHeight / 2;
  
//       // Ensure the hoverController stays within the boundaries of the simulation area
//       const boundedX = Math.max(0, Math.min(offsetX, simulationArea.offsetWidth - hoverController.offsetWidth));
//       const boundedY = Math.max(0, Math.min(offsetY, simulationArea.offsetHeight - hoverController.offsetHeight));
  
//       // Check if the new position overlaps with the sidebar
//       const hoverRect = hoverController.getBoundingClientRect();
//       const futureX = rect.left + boundedX;
//       const futureY = rect.top + boundedY;
  
//       if (futureX + hoverRect.width > sidebarRect.left) {
//         // Adjust boundedX to prevent overlapping with the sidebar
//         boundedX = sidebarRect.left - rect.left - hoverRect.width;
//       }
  
//       hoverController.style.transform = `translate(${boundedX}px, ${boundedY}px)`;
//     });
//   });
  

//-------------------------------------------------------------------------

// document.addEventListener('DOMContentLoaded', () => {
//     const hoverController = document.getElementById('hoverController');
//     const simulationArea = document.getElementById('simulation-area');
//     const sidebar = document.getElementById('sim-sidebar-inputs');
  
//     let startX, startY, initialX, initialY;
  
//     hoverController.addEventListener('dragstart', (e) => {
//       startX = e.clientX;
//       startY = e.clientY;
//       const style = window.getComputedStyle(hoverController);
//       const matrix = new WebKitCSSMatrix(style.transform);
//       initialX = matrix.m41;
//       initialY = matrix.m42;
//     });
  
//     simulationArea.addEventListener('dragover', (e) => {
//       e.preventDefault();
//     });
  
//     simulationArea.addEventListener('drop', (e) => {
//       e.preventDefault();
//       const rect = simulationArea.getBoundingClientRect();
//       const sidebarRect = sidebar.getBoundingClientRect();
//       const offsetX = e.clientX - rect.left - hoverController.offsetWidth / 2;
//       const offsetY = e.clientY - rect.top - hoverController.offsetHeight / 2;
  
//       // Ensure the hoverController stays within the boundaries of the simulation area
//       let boundedX = Math.max(0, Math.min(offsetX, simulationArea.offsetWidth - hoverController.offsetWidth));
//       let boundedY = Math.max(0, Math.min(offsetY, simulationArea.offsetHeight - hoverController.offsetHeight));
  
//       // Check if the new position overlaps with the sidebar
//       const futureX = rect.left + boundedX;
//       const futureY = rect.top + boundedY;
  
//       if (futureX + hoverController.offsetWidth > sidebarRect.left) {
//         // Adjust boundedX to prevent overlapping with the sidebar
//         boundedX = sidebarRect.left - rect.left - hoverController.offsetWidth;
//       }
  
//       hoverController.style.transform = `translate(${boundedX}px, ${boundedY}px)`;
//     });
//   });
  
  
  