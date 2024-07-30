
export async function handleTrash(toDel, modelID, userID) {
    const response = await fetch("https://final-web-cloud-proj-server.onrender.com/api/simulations/delete", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ modelID: modelID, userID: userID })
    });
    if (response.status !== 200) {
        alert("Couldn't delete model from database.");
        return;
    }
    toDel.remove();
    decreaseSimCardHeight(toDel);
}
export async function handleDuplicate(toDup, modelID, userID) {
    const response = await fetch("https://final-web-cloud-proj-server.onrender.com/api/simulations/duplicate", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ modelID: modelID, userID: userID })
    });
    if (response.status !== 200) {
        alert("Couldn't duplicate model from database.");
        return;
    }


    const parent = toDup.parentNode;
    const node = toDup.cloneNode(toDup);
    const button = toDup.getElementsByTagName('button')[0];

    const dupButton = node.querySelector('img');
    dupButton.onclick = (() => handleDuplicate(node, modelID, userID));
    const trashButton = node.getElementsByTagName('img')[1];
    trashButton.onclick = (() => handleTrash(node, modelID, userID));
    node.getElementsByTagName('button')[0].onclick = button.onclick;


    parent.appendChild(node);
    increaseSimCardHeight(node);
}
export async function handleSimViewButton(id, name, date, url) {
    loadSessionVars(id, name, date, url);
    window.location.href = 'simulation.html';

}

export function increaseSimCardHeight(node) {
    const simCard = document.getElementById('simulations-card');
    const nodeHeight = node.offsetHeight;
    const margin = window.getComputedStyle(simCard).marginBottom;
    const height = simCard.offsetHeight + nodeHeight - margin;
    simCard.style.height = height + 'px';
}

export function decreaseSimCardHeight(node) {
    const simCard = document.getElementById('simulations-card');
    const nodeHeight = node.offsetHeight;
    const margin = window.getComputedStyle(simCard).marginBottom;
    const height = simCard.offsetHeight - nodeHeight + margin;
    simCard.style.height = height + 'px';

}

function loadSessionVars(modelID, modelName, modelDate, modelURL) {
    sessionStorage.setItem('model-date', modelDate);
    sessionStorage.setItem('model-name', modelName);
    sessionStorage.setItem('model-url', modelURL);
    sessionStorage.setItem('model-id', modelID);
}


