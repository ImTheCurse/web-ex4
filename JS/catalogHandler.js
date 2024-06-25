
document.addEventListener('DOMContentLoaded', () => {
    let catalogData = [];

    // Fetch the catalog data
    fetch('./data/catalog.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('JSON data fetched successfully:', data);
            catalogData = data.catalog_data;
            displayCards(catalogData);
        })
        .catch(error => console.error('Error fetching catalog data:', error));

    // Function to display cards
    function displayCards(data) {
        const cardContainer = document.getElementById('card-container');
        cardContainer.innerHTML = ''; // Clear the container

        data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';

            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';

            const titleSpan = document.createElement('span');
            titleSpan.id = 'card-title-span';

            const link = document.createElement('a');
            link.href = 'simulations.html';
            const img = document.createElement('img');
            img.src = `images/Img_${item.name}.svg`; 
            img.alt = `Img_${item.name}`;
            link.appendChild(img);

            const title = document.createElement('h3');
            title.className = 'card-title';
            title.textContent = item.name;

            const creator = document.createElement('h6');
            creator.textContent = `By ${item.creator_name}`; // Replace with creator's name if available

            titleSpan.appendChild(link);
            titleSpan.appendChild(title);
            titleSpan.appendChild(creator);

            const descSpan = document.createElement('span');
            descSpan.className = 'span-desc';

            // Adding image icons for views and likes
            descSpan.innerHTML = `<img src="images/clock.svg" alt="clock"> ${item.date} | <img src="images/views.svg" alt="Views"> ${item.views} | <img src="images/heart.svg" alt="Likes"> ${item.likes}`;

            cardBody.appendChild(titleSpan);
            cardBody.appendChild(descSpan);
            card.appendChild(cardBody);
            cardContainer.appendChild(card);
        });
    }

    // Search functionality
    const searchInput = document.getElementById('search_input');

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredData = catalogData.filter(item =>
            item.name.toLowerCase().includes(searchTerm) ||
            item.creator_name.toLowerCase().includes(searchTerm)
        );
        displayCards(filteredData);
    });
});

