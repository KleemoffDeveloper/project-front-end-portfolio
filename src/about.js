let homeButton = document.querySelector('.logo');

homeButton.addEventListener('click', () => openHomePage);

document.getElementById('logo-companion').addEventListener('click', openHomePage)

function openHomePage() {
    window.open('index.html', '_self');
}