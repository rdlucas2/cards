import { Card, CardState, CardOrientation } from '../Card';

export enum HierarchyColor {
    LIGHT,
    DARK
}

export enum HierarchyRank {
    IMPOSTER = 0,
    ASSASSIN,
    LEPER,
    SERF,
    TOWER,
    SURGEON,
    KNIGHT,
    USURPER,
    SORCERER,
    DRAGON,
    BARONESS,
    HIGH_PRIEST,
    QUEEN,
    KING
}

export class HierarchyCard implements Card {
    constructor(ability: string, rank: HierarchyRank, isRoyalty: boolean = false) {
        this.name = HierarchyRank[rank];
        this.ability = ability;
        this.rank = rank;
        this.isRoyalty = isRoyalty;
    }

    state: CardState = CardState.UP;
    orientation: CardOrientation = CardOrientation.VERTICAL;
    name: string;
    isRoyalty: boolean;

    ability: string;
    rank: HierarchyRank;
    color: HierarchyColor;
}