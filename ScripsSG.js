// A Responsive Memory card game application
// Here we created a memory card game with animal emoji concept that is easy and fun to remember.
// Enhance the game by adding more features as possible.

// INSTRUCTIONS TO PLAY
// 1. Hover through each card to view the emoji appear.
// 2. Memorize each card character.
// 3. When the user selects two cards with the same emoji, the cards disappear.
// 4. Follow step 3 until no cards are left.
// 5. There you go, Hurray Win!

const symbols = ['🐱', '🐶', '🐭', '🐹', '🐰', '🦊', '🐻', '🐨', '🐼', '🐯', '🐸', '🐷'];
const cards = [...symbols, ...symbols];
const shuffledCards = _.shuffle(cards);
let selectedCards = [];

// Initialize the game by creating card elements.
function initializeGame() {
    const cardsContainer = document.getElementById('cardsContainer');

    shuffledCards.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-index', index);
        card.addEventListener('click', flipCard);
        cardsContainer.appendChild(card);
    });
}

// Function to handle the card flip event.
function flipCard() {
    const selectedCard = this;
    const index = selectedCard.getAttribute('data-index');

    if (selectedCards.length < 2) {
        selectedCard.textContent = shuffledCards[index];
        selectedCards.push({ index, symbol: shuffledCards[index] });

        if (selectedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

// Function to check if the selected cards match.
function checkMatch() {
    const [card1, card2] = selectedCards;

    if (card1.symbol === card2.symbol && card1.index !== card2.index) {
        hideCards(card1.index, card2.index);
    } else {
        resetCards(card1.index, card2.index);
    }

    selectedCards = [];
}

// Function to hide matching cards.
function hideCards(index1, index2) {
    document.querySelector(`[data-index="${index1}"]`).style.visibility = 'hidden';
    document.querySelector(`[data-index="${index2}"]`).style.visibility = 'hidden';

    if (document.querySelectorAll('.card[style="visibility: hidden;"]').length === shuffledCards.length) {
        alert('Congratulations! You matched all the cards!');
    }
}

// Function to reset cards if they don't match.
function resetCards(index1, index2) {
    document.querySelector(`[data-index="${index1}"]`).textContent = '';
    document.querySelector(`[data-index="${index2}"]`).textContent = '';
}

// Initialize the game when the page loads.
initializeGame();
              
