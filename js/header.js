export { updateHeader }

function updateHeader() {
    setUserInfo();
}

async function setUserInfo() {
    const profileImage = document.getElementById('profile-image');
    const userName = document.getElementById('user_full_name');
    const id = await fetch('https://final-web-cloud-proj-server.onrender.com/api/session/check', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sessionID: sessionStorage.getItem('AeroSim-session-key') })
    }).then(res => res.json());



    const userInfo = await fetch("https://final-web-cloud-proj-server.onrender.com/api/login/user", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id.id })
    }).then(res => res.json());

    profileImage.setAttribute('src', userInfo.image_url);
    userName.innerText = userInfo.name;

    const headerTitle = document.getElementById('Welcome-first_name');
    if (headerTitle != null) {
        headerTitle.innerHTML += `Welcome, ${userInfo.name.split(' ')[0]}`
    }
}

