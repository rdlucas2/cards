import { Card, CardState, CardOrientation } from './Card';

export default class GenericCard implements Card {
    constructor(name: string, content: string, art: URL = new URL('')) {
        this.name = name
        this.content = content;
        this.art = art;
    }

    state: CardState = CardState.DOWN;
    orientation: CardOrientation = CardOrientation.VERTICAL;
    name: string;

    content: string;
    art: URL;
}