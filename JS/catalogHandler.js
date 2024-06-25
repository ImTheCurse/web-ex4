
document.addEventListener('DOMContentLoaded', () => {
    fetch('./data/catalog.json')
        .then(response => response.json())
        .then(data => {
            const catalogData = data.catalog_data;
            const cardContainer = document.getElementById('card-container');
            
            catalogData.forEach(item => {
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
                descSpan.id = 'span-desc';
                descSpan.textContent = `Views: ${item.views} | Likes: ${item.likes}`;

                cardBody.appendChild(titleSpan);
                cardBody.appendChild(descSpan);
                card.appendChild(cardBody);
                cardContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching catalog data:', error));
});
