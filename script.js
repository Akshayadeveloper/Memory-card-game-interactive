//A Responsive Memory card game application
//Here we created an memory card with  animal emoji concept that easy and fun to remember.
//Make more enhanced version of this game by adding more features as possible
// INSTRUCYIONS TO PLAY

//1. Hover through each card to view the emoji apper.
//2. Memorize each card character.
//3. When user select two card with same emoji, the card disappear.
//4.Follow step:3 until no card left.
//5. There you go, Hurray Win
    
    const symbols = ['🐱', '🐶', '🐭', '🐹', '🐰', '🦊', '🐻', '🐨', '🐼', '🐯', '🐸', '🐷'];
    const cards = [...symbols, ...symbols];
    const shuffledCards = _.shuffle(cards);
    let selectedCards = [];

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

    function checkMatch() {
        const [card1, card2] = selectedCards;

        if (card1.symbol === card2.symbol && card1.index !== card2.index) {
            hideCards(card1.index, card2.index);
        } else {
            resetCards(card1.index, card2.index);
        }

        selectedCards = [];
    }

    function hideCards(index1, index2) {
        document.querySelector(`[data-index="${index1}"]`).style.visibility = 'hidden';
        document.querySelector(`[data-index="${index2}"]`).style.visibility = 'hidden';

        if (document.querySelectorAll('.card[style="visibility: hidden;"]').length === shuffledCards.length) {
            alert('Congratulations! You matched all the cards!');
        }
    }

    function resetCards(index1, index2) {
        document.querySelector(`[data-index="${index1}"]`).textContent = '';
        document.querySelector(`[data-index="${index2}"]`).textContent = '';
    }

    initializeGame();

