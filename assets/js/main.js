
const cardDeck = ['assets/images/castle.jpg', 'assets/images/cat.jpg', 'assets/images/dragon.jpg', 'assets/images/frog.jpg', 'assets/images/gingerbread.jpg', 'assets/images/owl.jpg', 'assets/images/rabbit.jpg', 'assets/images/rainbow.jpg'];
const allCards = cardDeck.concat(cardDeck);

class PlayGame {
  constructor() {
    this.fullDeck = [];
    this.matchedCards = [];
    this.totalTurns = 0;
    this.turns = document.getElementById('turns');
  }

  buildCards() {
    const addCard = document.getElementById('main-gameboard');

    allCards.forEach(
      (href) => addCard.insertAdjacentHTML('beforeend',
        `<div class="card">
             <div class="card-back all-cards">
            <img src="assets/images/card-back.jpg"
                class="card-img">
            </div> 
            <div class="card-picture all-cards">
            <img class="card-value card-img"
                src="${href}">
            </div>
            </div>`,)
        );

    const cards = Array.from(document.getElementsByClassName('card'));
    
         cards.forEach((card) => {
            card.addEventListener('click', () => {
                this.turnCard(card);
            });
        });
    this.fullDeck = cards;
}

beginGame() {
    this.checkCard = null;
    this.totalTurns = 0;
    this.busy = true; 
    this.hideCards();
    this.buildCards();
    this.matchedCards = [];
    this.turns.innerText = this.totalTurns;
    this.shuffleDeck();
}

turnCard(card) {
    if (this.turnCardYes(card)) {
            this.totalTurns++; 
            this.turns.innerText = this.totalTurns;
            card.classList.add('visible'); 

            if (this.checkCard) {
                this.checkForMatch(card);
            } else {
                this.checkCard = card;
            }
        }
    }

checkForMatch(card) {
        if (this.checkCardType(card) === this.checkCardType(this.checkCard)) {
            this.cardMatcher(card, this.checkCard);
        } else {
            this.notAMatch(card, this.checkCard);
            this.checkCard = null;}
    }

cardMatcher(card1, card2) {
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        if (this.matchedCards.length === this.fullDeck.length);
    }

notAMatch(card1, card2) {
        this.busy = true;
        setTimeout(() => {
            card1.classList.remove('visible');
            card2.classList.remove('visible');
            this.busy = false;
        }, 800);
    }

hideCard() {
        this.fullDeck.forEach((card) => {
            card.classList.remove('visible');
            card.classList.remove('matched');
        });
    }

checkCardType() {
        this.fullDeck.forEach((card) => {
        return card.getElementsByClassName('card-value')[0].src;
        })
};

 shuffleDeck() { 
        for (let i = this.fullDeck.length - 1; i > 0; i--) {
            let randomIndex = Math.floor(Math.random() * (i + 1));
            this.fullDeck[randomIndex].style.order = i; 
            this.fullDeck[1].style.order = randomIndex;
        }
}

turnCardYes(card) {
        return !this.busy && !this.matchedCards.includes(card) && card !== this.checkCard;
    }
}

function begin() {
    const overlay = Array.from(document.getElementsByClassName('overlay-text'));
    const newGame = new PlayGame(); 

  overlay.forEach((overlay) => {
    overlay.addEventListener('click', () => {
      overlay.classList.remove('visible');
      newGame.buildCards();
    });
  });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', begin());
} else {
    begin();
}
