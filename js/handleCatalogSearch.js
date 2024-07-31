window.onload = () => {
    if ('true' === sessionStorage.getItem('input-value-available')) {
        insertInputData();
    }
}

export function handleSearchFromHome() {
    const HomeSearchBar = document.getElementById('Search-bar-modal');
    sessionStorage.setItem('input-value', HomeSearchBar.value);
    sessionStorage.setItem('input-value-available', 'true');
    window.location.href = 'catalog.html';
}

export function insertInputData() {
    const newInputBar = document.getElementById('search_input');
    newInputBar.value = sessionStorage.getItem('input-value');
    newInputBar.focus();
    sessionStorage.removeItem('input-value-available');
    sessionStorage.removeItem('input-value');
}

if (document.getElementById('search-btn-modal') != null) {
    document.getElementById('search-btn-modal').addEventListener('click', () => {
        handleSearchFromHome();
    })
}

export async function checkSessionID() {
    try {
        const sessionID = sessionStorage.getItem('AeroSim-session-key');
        if (sessionID == null) {
            window.location.href = 'login.html';
        }
        const response = await fetch("https://final-web-cloud-proj-server.onrender.com/api/session/check", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sessionID: sessionID })
        });

        const id = await response.json();
        const role = await fetch("https://final-web-cloud-proj-server.onrender.com/api/login/user", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id.id })
        }).then(res => res.json());



        const fileName = location.href.split("/").slice(-1)[0];
        if (response.status === 200) {
            if (role.role != 'user' && (fileName == 'simulation.html' || fileName == 'index.html' || fileName == 'simulations.html' ||
                fileName == 'catalog.html' || fileName == 'messagesUser.html')) {
                window.location.href = 'login.html';
            }
            if (role.role != 'admin' && (fileName == 'catalogAdmin.html' || fileName == 'stats.html' || fileName == 'messages.html')) {
                window.location.href = 'login.html';
            }
            return await id.id;
        } else {
            window.location.href = 'login.html';
        }
    } catch (err) { }
}


