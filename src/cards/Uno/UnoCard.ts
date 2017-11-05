import { Card, CardState, CardOrientation } from '../Card';

export enum UnoColor {
    RED = "RED",
    GREEN = "GREEN",
    BLUE = "BLUE",
    YELLOW = "YELLOW",
    BLACK = "BLACK"
}

export enum UnoRank {
    ZERO = 0,
    ONE,
    TWO,
    THREE,
    FOUR,
    FIVE,
    SIX,
    SEVEN,
    EIGHT,
    NINE,
    DRAW_TWO,
    SKIP,
    REVERSE,
    WILD,
    WILD_DRAW_FOUR
}

export class UnoCard implements Card {
    constructor(color: UnoColor, rank: UnoRank) {
        this.name = (color + ' ' + rank).trim();
        this.rank = rank;
        this.color = color;
    }
    
    state: CardState = CardState.DOWN;
    orientation: CardOrientation = CardOrientation.VERTICAL;
    name: string;

    rank: UnoRank;
    color: UnoColor;
}