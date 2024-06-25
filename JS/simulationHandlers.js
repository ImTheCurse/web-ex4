import * as header from "./js_header.js";
window.onload = () =>{
    populateSimulationHome();
    header.updateHeader();

}

async function populateSimulationHome(){
    const tableData = await fetch('../data/Users.json').then((response) => response.json()).then((obj)=> obj.users_data);
    const tableLength = await tableData.length;
    const tableBody = document.getElementsByTagName('table')[0].getElementsByTagName('tbody')[0];

    //limit number of simulations in home page.
    if(tableLength > 3){
        tableLength = 3;
    }

    //Load data into table row element
    for(let i = 0; i < tableLength;i++){
        const tableID = document.createElement('td');
        const name = document.createElement('td');
        const date = document.createElement('td');
        const difficulty = document.createElement('td');
        const button = document.createElement('button');

        //at the 0th position since we aren't using a database but a json file to load the users.
        const sim = tableData[0].simulations[i]; 
        tableID.innerHTML = tableData[i].user_id;
        name.innerHTML = sim.name;
        date.innerHTML = sim.date;
        difficulty.innerHTML = sim.difficulty;


        let duplicate = document.createElement('td');
        const dupImg = document.createElement('img');
        dupImg.src = 'images/duplicate.svg';
        dupImg.alt = 'Duplicate Icon';
        dupImg.onclick = handleDuplicate;
        duplicate.appendChild(dupImg);

        let trash = document.createElement('td');
        const trashImg = document.createElement('img'); 
        trashImg.src = 'images/trash.svg';
        trashImg.alt = 'Trash Icon';
        trashImg.onclick = handleTrash;
        trash.appendChild(trashImg);

        const btn = document.createElement('td');
        button.textContent = 'View';
        button.className = 'btn btn-primary';
        button.onclick = handleSimViewButton;
        button.style.marginTop = '20px';
        btn.appendChild(button);

        const tableRow = document.createElement('tr');
        tableRow.appendChild(tableID);
        tableRow.appendChild(name);
        tableRow.appendChild(date);
        tableRow.appendChild(difficulty);
        tableRow.appendChild(duplicate);
        tableRow.appendChild(trash);
        tableRow.appendChild(btn);
        tableBody.appendChild(tableRow);

    }


    
}

function handleDuplicate(tableIndex){}
function handleTrash(tableIndex){}
function handleSimViewButton(tableIndex){}