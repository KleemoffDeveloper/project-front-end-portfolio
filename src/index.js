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

    document.getElementById('no-results').style.display = 'none';

    let profileFinished = true;

    let inputs = document.querySelector('.profile-input').querySelectorAll('input');

    for(let i = 0; i < inputs.length; i++) {
        if(inputs[i].value.length === 0) {
            window.alert('Please fill out all forms in the "Profile" section.');
            profileFinished = false;
            break;
        }

        if(inputs[0].value.length < 3) {
            window.alert('Names must be 3 or more characters...');
            profileFinished = false;
            break; 
        }
    }

    let searchQuery = searchForm.querySelector('input').value.toLowerCase();

    for(let i = 0; i < allCharacters.length; i++) {
        let data = allCharacters[i];
        let card = cards[i];

        let queries = [data.name.toLowerCase(), data.gender.toLowerCase(), data.species.toLowerCase(), data.origin.name.toLowerCase()];

        let show = 
            ((data.name.toLowerCase().includes(searchQuery) 
        || data.gender.toLowerCase().includes(searchQuery) 
        || data.species.toLowerCase().includes(searchQuery)
        || data.origin.name.toLowerCase().includes(searchQuery)));

        let isIncludedLiteral = queries.some(query => {
            return searchQuery.split(' ').filter(keyword => {
                return query === keyword;
            })[0]
        });

        if((show || isIncludedLiteral) && searchQuery !== '' && profileFinished) {
            card.style.display = "";

            if(data.compatible) {
                card.style.background = "linear-gradient(to bottom, whitesmoke, #63ff8d)";
                card.querySelector('h1').innerText = `${(i + 1)}. ${data.name} (COMPATIBLE)`;
            }
            else {
                card.style.background = "linear-gradient(to bottom, whitesmoke, red)";
                card.querySelector('h1').innerText = `${(i + 1)}. ${data.name} (INCOMPATIBLE)`;
            }
        }
        else if(!show && profileFinished){
            card.style.display = "none";
        }
        else {
            card.style.display = "";

            card.style.background = "";

            card.querySelector('h1').innerText = `${(i + 1)}. ${data.name}`;
        }
    }

    let noResults = true;

    for(let i = 0; i < cards.length; i++) {
        let card = cards[i];
        if(card.style.display == '') {
            noResults = false;
            break;
        }
    }

    document.getElementById('no-results').style.display = noResults ? '' : 'none';
}

// export {BASE_URL};