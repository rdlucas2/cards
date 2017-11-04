import Deck from './cards/Deck';
import { Card, CardState, CardOrientation } from './cards/Card';
import GenericCard from './cards/GenericCard';
import { PlayingCard, Suit, Rank } from './cards/PlayingCards/PlayingCard';
import DeckOfPlayingCards from './cards/PlayingCards/DeckOfPlayingCards';
import { UnoCard, UnoColor, UnoRank } from './cards/Uno/UnoCard';
import DeckOfUnoCards from './cards/Uno/DeckOfUnoCards';

(()=> {
    function listCards(deck) {
        for (var i =0; i < deck.cards.length; i++) {
            var elem = document.createElement('p');
            elem.innerText = deck.cards[i].name;
            document.body.appendChild(elem);
        }
    }
    
    var deck = DeckOfPlayingCards();
    deck.shuffle();
    listCards(deck);
    
    var unoDeck = DeckOfUnoCards();
    unoDeck.shuffle();
    listCards(unoDeck);
})();