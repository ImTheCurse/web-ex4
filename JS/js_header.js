window.onload = () => {
    fetch("../data/Users.json")
    .then(response => response.json())
    .then(data => updateHeader(data) );


}

function updateHeader(data) {
    const headerTitle = document.getElementById('Welcome-first_name');
    headerTitle.innerHTML += `Welcome, ${data.users_data[0].first_name}` 
}