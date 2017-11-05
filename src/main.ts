import Deck from './cards/Deck';
import { Card, CardState, CardOrientation } from './cards/Card';
import GenericCard from './cards/GenericCard';
import { PlayingCard, Suit, Rank } from './cards/PlayingCards/PlayingCard';
import DeckOfPlayingCards from './cards/PlayingCards/DeckOfPlayingCards';
import { UnoCard, UnoColor, UnoRank } from './cards/Uno/UnoCard';
import DeckOfUnoCards from './cards/Uno/DeckOfUnoCards';

(()=> {
    // function listCards(deck) {
    //     for (var i =0; i < deck.cards.length; i++) {
    //         var elem = document.createElement('p');
    //         elem.innerText = deck.cards[i].name;
    //         document.body.appendChild(elem);
    //     }
    // }
    
    // var deck = DeckOfPlayingCards();
    // deck.shuffle();
    // listCards(deck);
    
    // var unoDeck = DeckOfUnoCards();
    // unoDeck.shuffle();
    // listCards(unoDeck);

    function renderCard(card: Card) {
        var elem = document.createElement('div');

        var classes = 'card'

        if(card instanceof PlayingCard) {
            classes += ' playing-card';
        }
        
        if(card instanceof UnoCard) {
            classes += ' uno-card';
        }

        if(card instanceof GenericCard) {
            classes += ' generic-card';
        }

        if(card.state === CardState.DOWN) {
            classes += ' ' + CardState.DOWN;
        } else {
            if(card instanceof PlayingCard) {
                classes += ' ' + card.rank + ' ' + card.suit;
                switch(card.suit.toString()) {
                    case "SPADES": //Suit.SPADES:
                        elem.innerHTML = '<p>&spades;</p>';
                        break;
                    case "CLUBS": //Suit.CLUBS:
                        elem.innerHTML = '<p>&clubs;</p>';
                        break;
                    case "HEARTS": //Suit.HEARTS:
                        elem.innerHTML = '<p>&hearts;</p>';
                        break;
                    case "DIAMONDS": //Suit.DIAMONDS:
                        elem.innerHTML = '<p>&diams;</p>';
                        break;
                }
            }
            
            if(card instanceof UnoCard) {
                classes += ' ' + card.rank + ' ' + card.color;
            }
    
            if(card instanceof GenericCard) {

            }
        }

        classes = classes.trim();
        if(classes !== "card") {
            elem.setAttribute('class', classes);
            document.body.appendChild(elem);
        } else {
            throw "NO VALID CARD INFO FOUND FOR RENDERING!";
        }
    }

    var deck = DeckOfPlayingCards();
    deck.shuffle();

    for(var i = 0; i < deck.cards.length; i++) {
        deck.cards[i].state = CardState.UP;
        renderCard(deck.cards[i]);
    }
    
    var unoDeck = DeckOfUnoCards();
    unoDeck.shuffle();

    for(var i = 0; i < unoDeck.cards.length; i++) {
        unoDeck.cards[i].state = CardState.UP;
        renderCard(unoDeck.cards[i]);
    }
})();