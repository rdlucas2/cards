import { Card, CardState } from './cards/Card';
import { GenericCard } from './cards/GenericCards/GenericCard';
import { HierarchyCard, HierarchyColor } from './cards/HierarchyCards/HierarchyCard';
import { PlayingCard } from './cards/PlayingCards/PlayingCard';
import { UnoCard } from './cards/Uno/UnoCard';

import DeckOfGenericCards from './cards/GenericCards/DeckOfGenericCards';
import DeckOfHierarchyCards from './cards/HierarchyCards/DeckOfHierarchyCards';
import DeckOfPlayingCards from './cards/PlayingCards/DeckOfPlayingCards';
import DeckOfUnoCards from './cards/Uno/DeckOfUnoCards';

import { GenericCardHtmlView } from './cards/GenericCards/GenericCardHtmlView';
import { HierarchyCardHtmlView } from './cards/HierarchyCards/HierarchyCardHtmlView'
import { PlayingCardHtmlView } from './cards/PlayingCards/PlayingCardHtmlView';
import { UnoCardHtmlView } from './cards/Uno/UnoCardHtmlView';

(() => {
    function renderCard(card: Card) {
        switch (card.constructor) {
            case GenericCard:
                new GenericCardHtmlView().render(<GenericCard>card);
                break;
            case HierarchyCard:
                new HierarchyCardHtmlView().render(<HierarchyCard>card);
                break;
            case PlayingCard:
                new PlayingCardHtmlView().render(<PlayingCard>card);
                break;
            case UnoCard:
                new UnoCardHtmlView().render(<UnoCard>card);
                break;
            default:
                throw "Render for card type not implemented!";
        }
    }

    var hierarchyDeck = DeckOfHierarchyCards();
    hierarchyDeck.shuffle();
    hierarchyDeck.cards.forEach((e: HierarchyCard, i: number) => {
        e.color = i < 7 ? HierarchyColor.LIGHT : HierarchyColor.DARK;
        renderCard(e);
    });

    var genericDeck = DeckOfGenericCards([new GenericCard('test', 'content', new URL("https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQG_BQsZrxdE_BeuZXPX1Wq1Z0hyNZAki1XwlXmZOP_e77HDk84&usqp=CAU"))])
    genericDeck.cards.forEach((e: GenericCard) => {
        renderCard(e);
    });
    genericDeck.cards[0].state = CardState.UP;
    renderCard(genericDeck.cards[0]);

    var deck = DeckOfPlayingCards();
    deck.shuffle();
    for (var i = 0; i < deck.cards.length; i++) {
        deck.cards[i].state = CardState.UP;
        renderCard(deck.cards[i]);
    }

    var unoDeck = DeckOfUnoCards();
    unoDeck.shuffle();

    for (var i = 0; i < unoDeck.cards.length; i++) {
        unoDeck.cards[i].state = CardState.UP;
        renderCard(unoDeck.cards[i]);
    }
})();