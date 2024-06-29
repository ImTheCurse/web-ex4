import * as header from "./js_header.js";
window.onload = () =>{
    populateSimulationHome(5);
    header.updateHeader();

}

export async function populateSimulationHome(maxLength){
    const tableData = await fetch('../data/Users.json').then((response) => response.json()).then((obj)=> obj.users_data);
    let tableLength = await tableData[0].simulations.length;
    const tableBody = document.getElementsByTagName('table')[0].getElementsByTagName('tbody')[0];

    if(tableLength > maxLength){
        tableLength = maxLength;
    }
    for(let i = 0; i < tableLength;i++){
        const tableID = document.createElement('td');
        const name = document.createElement('td');
        const date = document.createElement('td');
        const difficulty = document.createElement('td');
        const button = document.createElement('button');

        //at the 0th position since we aren't using a database but a json file to load the users.
        const sim = tableData[0].simulations[i]; 
        tableID.innerHTML = i + 1;
        name.innerHTML = sim.name;
        date.innerHTML = sim.date;
        difficulty.innerHTML = sim.difficulty;


        let duplicate = document.createElement('td');
        const dupImg = document.createElement('img');
        dupImg.src = 'images/duplicate.svg';
        dupImg.alt = 'Duplicate Icon';
        duplicate.appendChild(dupImg);

        let trash = document.createElement('td');
        const trashImg = document.createElement('img'); 
        trashImg.src = 'images/trash.svg';
        trashImg.alt = 'Trash Icon';

        const btn = document.createElement('td');
        button.textContent = 'View';
        button.className = 'btn btn-primary';
        button.onclick = (()=> handleSimViewButton(i));
        button.style.marginTop = '20px';
        btn.appendChild(button);

        const tableRow = document.createElement('tr');
        tableRow.appendChild(tableID);
        tableRow.appendChild(name);
        tableRow.appendChild(date);
        tableRow.appendChild(difficulty);

        dupImg.onclick = (()=> handleDuplicate(tableRow));
        tableRow.appendChild(duplicate);

        trashImg.onclick = (() => handleTrash(tableRow));
        trash.appendChild(trashImg);

        tableRow.appendChild(trash);
        tableRow.appendChild(btn);
        tableBody.appendChild(tableRow);

    }


    
}

function handleTrash(toDel){
    toDel.remove(); 
    decreaseSimCardHeight(toDel);
    
}
function handleDuplicate(toDup){
    const parent = toDup.parentNode;
    const node = toDup.cloneNode(toDup);

    const dupButton = node.querySelector('img');
    dupButton.onclick = (() => handleDuplicate(node));
    const trashButton = node.getElementsByTagName('img')[1];
    trashButton.onclick = (() => handleTrash(node));

    parent.appendChild(node);
    increaseSimCardHeight(node); 
}
async function handleSimViewButton(index){
    const tableData = await fetch('../data/Users.json').then((response) => response.json()).then((obj)=> obj.users_data);
    const model = tableData[0].simulations[index];
    const imgID = model.ImgID;
    const imgURL = `http://127.0.0.1:5500/simulation.html?img=http://127.0.0.1:5500/images/Img_${imgID}.svg`;
    sessionStorage.setItem('model-date',model.date);
    sessionStorage.setItem('model-name',model.name);
    window.location.href = imgURL;

}

function increaseSimCardHeight(node){
    const simCard = document.getElementById('simulations-card');
    const nodeHeight = node.offsetHeight;
    const margin =  window.getComputedStyle(simCard).marginBottom;
    const height = simCard.offsetHeight + nodeHeight - margin ;
    simCard.style.height = height + 'px';
}

function decreaseSimCardHeight(node){
    const simCard = document.getElementById('simulations-card');
    const nodeHeight = node.offsetHeight;
    const margin =  window.getComputedStyle(simCard).marginBottom;
    const height = simCard.offsetHeight - nodeHeight + margin;
    simCard.style.height = height + 'px';

}


