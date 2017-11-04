import Deck from '../Deck';
import { PlayingCard, Suit, Rank } from './PlayingCard';

export default function DeckOfPlayingCards() {
    let cards = new Array<PlayingCard>();
    for(let suit in Suit) {
        if(!isNaN(Number(suit))) {
            var s = suit as keyof typeof Suit;
            for(let rank in Rank) {
                if(!isNaN(Number(rank))) {
                    var r = rank as keyof typeof Rank;
                    cards.push(new PlayingCard(Rank[r], Suit[s]));
                }
            }
        }
    }
    return new Deck(cards);
}