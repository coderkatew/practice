
const cards = document.querySelectorAll('.card');

let turnedCard = false;
let cardOne, cardTwo;

function turnCard() {
    this.classList.add('turn');
    
    if (!turnedCard) {
        turnedCard = true;
        cardOne = this;
        console.log('YES');
}
}
cards.forEach(card => card.addEventListener('click', turnCard));