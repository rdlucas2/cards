import Deck from '../Deck';
import { UnoCard, UnoColor, UnoRank } from './UnoCard';

export default function DeckOfUnoCards() {
    let cards = new Array<UnoCard>();
    for(let color in UnoColor) {
        if(!isNaN(Number(color))) { continue; }
        if(color === "BLACK") { continue; }
        var c = color as keyof typeof UnoColor;
        for(let rank in UnoRank) {
            if(!isNaN(Number(rank))) { continue; }
            var r = rank as keyof typeof UnoRank;
            if(rank === "ZERO" || rank.indexOf('WILD') !== -1) {
                var tmpC = UnoColor[c];
                if(rank.indexOf('WILD') !== -1) {
                    tmpC = UnoColor.BLACK;
                }   
                cards.push(new UnoCard(tmpC, UnoRank[r]));
            } else {
                cards.push(new UnoCard(UnoColor[c], UnoRank[r]));
                cards.push(new UnoCard(UnoColor[c], UnoRank[r]));
            }
        }
    }
    return new Deck(cards);
}