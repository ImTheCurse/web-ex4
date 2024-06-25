export {updateHeader}

function updateHeader() {
    fetch("../data/Users.json")
    .then(response => response.json())
    .then(data => {
    const headerTitle = document.getElementById('Welcome-first_name');
    headerTitle.innerHTML += `Welcome, ${data.users_data[0].first_name}`
     console.log(headerTitle.innerHTML);
    const profileFullName = document.getElementById('user_full_name');
    profileFullName.innerHTML += `${data.users_data[0].first_name} ${data.users_data[0].last_name}`;
    })
    
}


