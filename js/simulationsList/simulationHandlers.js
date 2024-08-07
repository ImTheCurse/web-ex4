import * as header from "../header.js";
import { checkSessionID } from "../handleCatalogSearch.js";
import { handleTrash, handleDuplicate, handleSimViewButton, increaseSimCardHeight, decreaseSimCardHeight } from "./simListOperations.js";
window.onload = () => {
    checkSessionID();
    populateSimulationHome(5);
    header.updateHeader();
}


export async function populateSimulationHome(maxLength) {
    const sessionID = sessionStorage.getItem('AeroSim-session-key');
    try {
        const tableData = await fetch("https://final-web-cloud-proj-server.onrender.com/api/simulations", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sessionID: sessionID })
        }).then(resp => resp.json());



        let tableLength = await tableData.length;
        const tableBody = document.getElementsByTagName('table')[0].getElementsByTagName('tbody')[0];

        if (tableLength > maxLength) {
            tableLength = maxLength;
        }
        const userID = await checkSessionID();
        for (let i = 0; i < tableLength; i++) {
            const tableID = document.createElement('td');
            const name = document.createElement('td');
            const date = document.createElement('td');
            const difficulty = document.createElement('td');
            const button = document.createElement('button');

            const sim = tableData[i];
            tableID.innerHTML = sim.model_id;
            name.innerHTML = sim.model_name;
            date.innerHTML = sim.created_at.slice(0, 10);
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
            button.onclick = (() => handleSimViewButton(sim.model_id, sim.model_name, sim.created_at.slice(0, 10), sim.model_image_url));
            button.style.marginTop = '20px';
            btn.appendChild(button);

            const tableRow = document.createElement('tr');
            tableRow.appendChild(tableID);
            tableRow.appendChild(name);
            tableRow.appendChild(date);
            tableRow.appendChild(difficulty);

            dupImg.onclick = (() => handleDuplicate(tableRow, sim.model_id, userID));
            tableRow.appendChild(duplicate);

            trashImg.onclick = (() => handleTrash(tableRow, sim.model_id, userID));
            trash.appendChild(trashImg);

            tableRow.appendChild(trash);
            tableRow.appendChild(btn);
            tableBody.appendChild(tableRow);

        }
    } catch (err) { return; }
}


