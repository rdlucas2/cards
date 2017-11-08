import Deck from './cards/Deck';
import { Card, CardState, CardOrientation } from './cards/Card';
import GenericCard from './cards/GenericCard';
import { PlayingCard, Suit, Rank } from './cards/PlayingCards/PlayingCard';
import DeckOfPlayingCards from './cards/PlayingCards/DeckOfPlayingCards';
import { UnoCard, UnoColor, UnoRank } from './cards/Uno/UnoCard';
import DeckOfUnoCards from './cards/Uno/DeckOfUnoCards';

(()=> {
    function buildCardCornerHtml(id: string, symbol: string, cssClass: string): HTMLElement {
        var identifier = document.createElement('div');
        identifier.innerHTML = id;

        var suit = document.createElement('div');
        suit.innerHTML = symbol;

        var cornerContent = document.createElement('div');
        cornerContent.appendChild(identifier);
        cornerContent.appendChild(suit);

        var corner = document.createElement('div');
        corner.appendChild(cornerContent);
        corner.setAttribute('class', cssClass);

        return corner;
    }

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
                var symbol = '';
                switch(card.suit.toString()) {
                    case "SPADES": //Suit.SPADES:
                        symbol = '&spades;';
                        break;
                    case "CLUBS": //Suit.CLUBS:
                        symbol = '&clubs;';
                        break;
                    case "HEARTS": //Suit.HEARTS:
                        symbol = '&hearts;';
                        break;
                    case "DIAMONDS": //Suit.DIAMONDS:
                        symbol = '&diams;';
                        break;
                }

                var cornerLetter = '';
                var centerOfCard = document.createElement('div');
                switch(card.rank.toString()) {
                    case "ACE":
                        cornerLetter = 'A';
                        centerOfCard.innerHTML = symbol;
                        centerOfCard.setAttribute('class', 'center');
                        break;
                    case "TWO":
                        cornerLetter = '2';
                        var centerOfCard = document.createElement('div');
                        centerOfCard.innerHTML = symbol + '<br>' + symbol;
                        centerOfCard.setAttribute('class', 'center');
                        break;
                    case "THREE":
                        cornerLetter = '3';
                        var centerOfCard = document.createElement('div');
                        centerOfCard.innerHTML = symbol + '<br>' + symbol + '<br>' + symbol;
                        centerOfCard.setAttribute('class', 'center');
                        break;
                    case "FOUR":
                        cornerLetter = '4';
                        var centerOfCard = document.createElement('div');
                        centerOfCard.innerHTML = symbol + ' ' + symbol + '<br>' + symbol + ' ' + symbol;
                        centerOfCard.setAttribute('class', 'center');
                        break;
                    case "FIVE":
                        cornerLetter = '5';
                        var centerOfCard = document.createElement('div');
                        centerOfCard.innerHTML = symbol + ' ' + symbol + '<br>' + symbol + '<br>' + symbol + ' ' + symbol;
                        centerOfCard.setAttribute('class', 'center');
                        break;
                    case "SIX":
                        cornerLetter = '6';
                        var centerOfCard = document.createElement('div');
                        centerOfCard.innerHTML = symbol + ' ' + symbol + '<br>' + symbol + ' ' + symbol + '<br>' + symbol + ' ' + symbol;
                        centerOfCard.setAttribute('class', 'center');
                        break;
                    case "SEVEN":
                        cornerLetter = '7';
                        var centerOfCard = document.createElement('div');
                        centerOfCard.innerHTML = symbol + ' ' + symbol + '<br>' + symbol + ' ' + symbol + ' ' + symbol + '<br>' + symbol + ' ' + symbol;
                        centerOfCard.setAttribute('class', 'center');
                        break;
                    case "EIGHT":
                        cornerLetter = '8';
                        var centerOfCard = document.createElement('div');
                        centerOfCard.innerHTML = symbol + ' ' + symbol + '<br>' + symbol + ' ' + symbol + '<br>' + symbol + ' ' + symbol + '<br>' + symbol + ' ' + symbol;
                        centerOfCard.setAttribute('class', 'center');
                        break;
                    case "NINE":
                        cornerLetter = '9';
                        var centerOfCard = document.createElement('div');
                        centerOfCard.innerHTML = symbol + ' ' + symbol + ' ' + symbol + '<br>' + symbol + ' ' + symbol + ' ' + symbol + '<br>' + symbol + ' ' + symbol + ' ' + symbol;
                        centerOfCard.setAttribute('class', 'center');
                        break;
                    case "TEN":
                        cornerLetter = '10';
                        var centerOfCard = document.createElement('div');
                        centerOfCard.innerHTML = symbol + ' ' + symbol + ' ' + symbol + '<br>' + symbol + ' ' + symbol + '<br>' + symbol + ' ' + symbol + ' ' + symbol + '<br>' + symbol + ' ' + symbol;
                        centerOfCard.setAttribute('class', 'center');
                        break;
                    case "JACK":
                        cornerLetter = 'J';
                        var centerOfCard = document.createElement('div');
                        centerOfCard.innerHTML = document.getElementById('bart').outerHTML;
                        centerOfCard.setAttribute('class', 'center');
                        break;
                    case "QUEEN":
                        cornerLetter = 'Q';
                        var centerOfCard = document.createElement('div');
                        centerOfCard.innerHTML = document.getElementById('marge').outerHTML;
                        centerOfCard.setAttribute('class', 'center');
                        break;
                    case "KING":
                        cornerLetter = 'K';
                        var centerOfCard = document.createElement('div');
                        centerOfCard.innerHTML = document.getElementById('homer').outerHTML;
                        centerOfCard.setAttribute('class', 'center');
                        break;
                }

                var upperLeftCorner = buildCardCornerHtml(cornerLetter, symbol, 'upper-left');
                var lowerRightCorner = buildCardCornerHtml(cornerLetter, symbol, 'lower-right');
                elem.appendChild(upperLeftCorner);
                elem.appendChild(centerOfCard);
                elem.appendChild(lowerRightCorner);
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
    // deck.shuffle();

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