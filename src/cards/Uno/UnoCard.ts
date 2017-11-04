import { Card, CardState, CardOrientation } from '../Card';

export enum UnoColor {
    RED = "RED",
    GREEN = "GREEN",
    BLUE = "BLUE",
    YELLOW = "YELLOW",
    BLACK = ""
}

export enum UnoRank {
    ZERO = "0",
    ONE = "1",
    TWO = "2",
    THREE = "3",
    FOUR = "4",
    FIVE = "5",
    SIX = "6",
    SEVEN = "7",
    EIGHT = "8",
    NINE = "9",
    DRAWTWO = "DRAW TWO",
    SKIP = "SKIP",
    REVERSE = "REVERSE",
    WILD = "WILD",
    WILDFOUR = "WILD DRAW FOUR"
}

export class UnoCard implements Card {
    constructor(color: UnoColor, rank: UnoRank) {
        this.name = (color + ' ' + rank).trim();
        this.rank = rank;
        this.color = color;
    }
    
    state: CardState;
    orientation: CardOrientation;
    name: string;

    rank: UnoRank;
    color: UnoColor;
}