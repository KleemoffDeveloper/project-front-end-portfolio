const BASE_URL = 'https://rickandmortyapi.com/api/character';

let allCharacters = [];
let cards;

/**
 * 
 * @param {string} url - The base URL for fetching the API from https://rickandmortyapi.com
 */
function start(url) {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        data.results.forEach(character => {
            character.compatible = Math.floor(Math.random() * 2) ? true : false;
            allCharacters.push(character)
        });

        if(data.info.next) {
            start(data.info.next);
        }
        else {
            createCards(allCharacters.length);
        }
    })
    .catch(error => console.log(error));
}

/**
 * 
 * @param {number} amount - The amount of cards that get generated.
 */
function createCards(amount) {
    console.log(allCharacters[600]);

    for(let i = 0; i < amount; i++) {
        let card = document.createElement('div');
        card.className = 'box-style-1';

        // Upper box
        let h1 = document.createElement('h1');
        h1.innerText = (i + 1) + '. ' + allCharacters[i].name;

        let hr = document.createElement('hr');

        let img = document.createElement('img');
        img.src = allCharacters[i].image;

        // Lower box
        let lower = document.createElement('div');
        lower.className = 'lower-box';

        let p = document.createElement('p');

        p.innerText = `Gender: ${allCharacters[i].gender}\nFrom: ${allCharacters[i].origin.name}\nSpecies: ${allCharacters[i].species}`

        card.append(h1, hr, img);
        lower.append(p);
        
        card.append(lower);

        document.querySelector('.all-characters').append(card);
    }

    cards = document.querySelectorAll('.box-style-1');
}

start(BASE_URL);

let searchForm = document.querySelector('.searchbar');

searchForm.onsubmit = (event) => {
    event.preventDefault();

    for(let i = 0; i < allCharacters.length; i++) {
        if(!allCharacters[i].compatible) {
            console.log(cards[i]);
            cards[i].style.display = "none";
        } else {
            cards[i].querySelector('h1').innerHTML += " (<style=color:green;>COMPATIBLE</style>)";
        }
    }
}

export {BASE_URL};