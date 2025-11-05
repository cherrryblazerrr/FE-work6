const cardContainer = document.getElementById('card-container');
const refreshButton = document.getElementById('refresh-button');
const loadResult = document.getElementById('load-result');

const cardQuantity = 5;

window.addEventListener('load', () => updateContent());
const updateContent = async () => {
    cardContainer.innerHTML = '';

    const cardsData = await getCards(cardQuantity);

    for (let i = 0; i < cardQuantity; i++) {
        const card = document.createElement('div');
        card.className = 'card';

        const picture = document.createElement('img');
        picture.src = cardsData[i].picture;
        card.appendChild(picture);

        const info = document.createElement('p');
        info.innerHTML += `Name: ${cardsData[i].name}<br>`;
        info.innerHTML += `Phone number: ${cardsData[i].cell}<br>`;
        info.innerHTML += `City: ${cardsData[i].city}<br>`;
        info.innerHTML += `Country: ${cardsData[i].country}`;
        card.appendChild(info);

        cardContainer.appendChild(card);
    }
}

const getCards = async (resultsQuantity) => {
    if (resultsQuantity === undefined || resultsQuantity <= 0) {
        loadResult.textContent = '❌ Invalid results quantity';
        loadResult.classList = [];
        loadResult.classList.add('error');
        return;
    }
    const response = await fetch(`https://randomuser.me/api/?results=${resultsQuantity}`);
    if (!response.ok) {
        loadResult.classList = [];
        loadResult.classList.add('error');
        loadResult.textContent = '❌ Failed to fetch cards';
        return;
    }
    const data = await response.json();
    loadResult.classList = [];
    loadResult.classList.add('success');
    loadResult.textContent = '✔️ Cards loaded successfully';
    return data.results.map(result => {
        return {
            picture: result.picture.large,
            cell: result.cell,
            city: result.location.city,
            country: result.location.country,
            name: result.name.title + ' ' + result.name.first + ' ' + result.name.last
        }
    })
}
refreshButton.addEventListener('click', async () => updateContent());