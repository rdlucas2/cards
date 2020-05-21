import { Card } from './Card';

export default class Deck {
    constructor(cards: Card[]) {
        this.cards = cards;
    }
    cards: Card[];

    shuffle() {
        var j, x, i;
        for (i = this.cards.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = x;
        }
    }

    add(card: Card) {
        this.cards.push(card);
    }

    private NoCardsToRemoveError() {
        if (this.cards.length === 0) {
            throw "NO CARDS TO REMOVE!"
        }
    }

    removeCardByCard(card: Card): Card {
        this.NoCardsToRemoveError();
        var i = this.cards.indexOf(card);
        if (i !== -1) {
            var result = this.cards[i];
            this.cards.splice(i, 1);
            return result;
        } else {
            throw "CARD NOT FOUND!";
        }
    }

    removeCardByName(name: string): Card {
        this.NoCardsToRemoveError();
        var i = this.cards.findIndex((v) => {
            return v.name === name;
        });
        if (i !== -1) {
            var result = this.cards[i];
            this.cards.splice(i, 1);
            return result;
        } else {
            throw "CARD NOT FOUND!";
        }
    }

    removeCardByIndex(x: number): Card {
        this.NoCardsToRemoveError();
        var result = this.cards[x];
        this.cards.splice(x, 1);
        return result;
    }

    takeFromTop(x: number): Card[] {
        var result = new Array<Card>();
        for (var i = 0; i < x; i++) {
            result.push(this.cards.pop());
        }
        return result;
    }

    random(): Card {
        return this.cards[Math.floor(Math.random() * (this.cards.length - 0 + 1) + 0)];
    }
}