

document.getElementById('submit-btn').addEventListener('click', async function() {
    const uname = document.getElementById('username-input').value;
    const password = document.getElementById('password-input').value;
    if (uname === "" || password === "") {
        return;
    }

    const response = await fetch("https://final-web-cloud-proj-server.onrender.com/api/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: uname, password: password })
    });

    if (response.status != 200) {
        alert('Incorrect username or password');
        return;
    }

    const res = await response.json();
    sessionStorage.setItem('AeroSim-session-key', res.sessionID);
    if (res.role == 'user') {

        window.location.href = 'index.html';
    } else {
         window.location.href = 'catalogAdmin.html'
        console.log('TO IMPLEMENT');
    }

})


