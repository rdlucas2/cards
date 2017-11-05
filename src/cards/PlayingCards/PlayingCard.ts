import { Card, CardState, CardOrientation } from '../Card';

export enum Suit {
    SPADES,
    CLUBS,
    HEARTS,
    DIAMONDS
 }
 
 export enum Rank {
    ACE = 1,
    TWO,
    THREE,
    FOUR,
    FIVE,
    SIX,
    SEVEN,
    EIGHT,
    NINE,
    TEN,
    JACK,
    QUEEN,
    KING
}

export class PlayingCard implements Card {
    constructor(rank: Rank, suit: Suit) {
        this.name = rank + ' of ' + suit;
        this.rank = rank;
        this.suit = suit;
    }
    
    state: CardState = CardState.DOWN;
    orientation: CardOrientation = CardOrientation.VERTICAL;
    name: string;

    rank: Rank;
    suit: Suit;
}