import DeckOfPlayingCards from './cards/PlayingCards/DeckOfPlayingCards';
import DeckOfUnoCards from './cards/Uno/DeckOfUnoCards';
import { Card, CardState, CardOrientation } from './cards/Card';
import { expect } from 'chai';
import 'mocha';

function logCards(cards: Card[]) {
    for(var i = 0; i < cards.length; i++) {
        console.log(cards[i].name);
    }
}

function randomIntFromInterval(min: number, max: number)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

const unoDeck = DeckOfUnoCards();
const playingCardDeck = DeckOfPlayingCards();

describe('Deck', () => {
    var newDeck = DeckOfPlayingCards();
    var newUnoDeck = DeckOfUnoCards();
    newDeck.shuffle();
    newUnoDeck.shuffle();

    it('can shuffle cards', () =>{
        expect(playingCardDeck.cards).to.not.have.ordered.members(newDeck.cards)
            .and.members(unoDeck.cards).to.not.have.ordered.members(newUnoDeck.cards);
    });

    it('can remove cards from the top', () => {
        var originalLength = newUnoDeck.cards.length;
        var int = randomIntFromInterval(1, newUnoDeck.cards.length);
        var removedCards = newUnoDeck.takeFromTop(int);
        expect(originalLength).to.equal(newUnoDeck.cards.length + int);
    });

    it('can pick a random card', () => {
        var card = newUnoDeck.random();
        expect(card).to.be.oneOf(newUnoDeck.cards);
    });
});

describe('DeckOfPlayingCards', () => {
    it('should have 52 cards', () => {
        expect(playingCardDeck.cards.length).to.equal(52);
    });
});

describe('DeckOfUnoCards', () => {
    it('should have 108 cards', () => {
        expect(unoDeck.cards.length).to.equal(108);
    });
});