export {updateHeader}

function updateHeader() {
    fetch("../data/Users.json")
    .then(response => response.json())
    .then(data => {
    const headerTitle = document.getElementById('Welcome-first_name');
    if(headerTitle != null){
        headerTitle.innerHTML += `Welcome, ${data.users_data[0].first_name}`
    }
    const profileFullName = document.getElementById('user_full_name');
    profileFullName.innerHTML += `${data.users_data[0].first_name} ${data.users_data[0].last_name}`;
    })
    
}


