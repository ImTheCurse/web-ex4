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

function ZoomOut() {
    let imgH= document.getElementById("simulation-img");
    imgH.style.transform = "scale(1.5)";
    imgH = imgH.style.transform;
}

function ZoomIN() {
    let imgH= document.getElementById("simulation-img");
    imgH.style.transform = "scale(0.5)";    
}
