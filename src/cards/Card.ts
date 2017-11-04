export enum CardState {
    DOWN,
    UP
}

export enum CardOrientation {
    VERTICAL,
    HORIZONTAL
}

export interface Card {
    name: string;
    state: CardState;
    orientation: CardOrientation;
}