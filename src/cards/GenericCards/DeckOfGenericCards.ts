import Deck from '../Deck';
import { GenericCard } from './GenericCard';

export default function DeckOfGenericCards(cards: Array<GenericCard>) {
    return new Deck(cards);
}