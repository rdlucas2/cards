export enum CardState {
    DOWN = "DOWN",
    UP = "UP"
}

export enum CardOrientation {
    VERTICAL = "VERTICAL",
    HORIZONTAL = "HORIZONTAL"
}

export interface Card {
    name: string;
    state: CardState;
    orientation: CardOrientation;
}