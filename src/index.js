const BASE_URL = 'https://rickandmortyapi.com/api/character';

let allCharacters = [];
let cards;
let indexCounter = 0;

/**
 * 
 * @param {string} url - The base URL for fetching the API from https://rickandmortyapi.com
 */
function start(url) {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        data.results.forEach((character) => {
            indexCounter++;
            createCard(character, indexCounter);

            // Random compatibility (satire)
            character.compatible = Math.floor(Math.random() * 2) ? true : false;

            allCharacters.push(character);
        });

        if(data.info.next) {
            start(data.info.next);
        }
    })
    .catch(error => console.log(error));
}

/**
 * 
 * @param {object} cardObject - An object that represents a character from the rickandmortyapi JSON.
 * @param {number} index - The index (count) of the character from the API.
 */
function createCard(cardObject, index) {
    let card = document.createElement('div');
    card.className = 'box-style-1';

    // Upper box
    let h1 = document.createElement('h1');
    h1.innerText = (index) + '. ' + cardObject.name;

    let hr = document.createElement('hr');

    let img = document.createElement('img');
    img.src = cardObject.image;

    // Lower box
    let lower = document.createElement('div');
    lower.className = 'lower-box';

    let p = document.createElement('p');

    p.innerText = `Gender: ${cardObject.gender}\nFrom: ${cardObject.origin.name}\nSpecies: ${cardObject.species}`;

    card.append(h1, hr, img);
    lower.append(p);
    
    card.append(lower);

    document.querySelector('.all-characters').append(card);

    cards = document.querySelectorAll('.box-style-1');
}

start(BASE_URL);

let searchForm = document.querySelector('.searchbar');

searchForm.onsubmit = (event) => {
    event.preventDefault();

    let searchQuery = searchForm.querySelector('input').value.toLowerCase();

    for(let i = 0; i < allCharacters.length; i++) {
        let data = allCharacters[i];
        let card = cards[i];

        let show = 
            (data.name.toLowerCase().includes(searchQuery) 
        || data.gender.toLowerCase().includes(searchQuery) 
        || data.species.toLowerCase().includes(searchQuery)
        || data.origin.name.toLowerCase().includes(searchQuery)) && searchQuery !== '';

        if(show) {
            card.style.display = "";

            card.style.background = "linear-gradient(to bottom, yellowgreen, green)"
        }
        else {
            card.style.display = "none";
        }
    }
}

export {BASE_URL};