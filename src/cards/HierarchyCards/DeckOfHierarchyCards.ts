import Deck from '../Deck';
import { HierarchyCard, HierarchyRank } from './HierarchyCard';

export default function DeckOfHierarchyCards() {
    let cards = new Array<HierarchyCard>();

    let imposter = new HierarchyCard("Play this as a copy of any card already played by your opponent, except the top card.", HierarchyRank.IMPOSTER);
    let assassin = new HierarchyCard("May be played atop any card except the Tower and Leper", HierarchyRank.ASSASSIN);
    let leper = new HierarchyCard("May be played atop any odd numbered card. Royalty and the Assassin may not be played atop the Leper.", HierarchyRank.LEPER);
    let serf = new HierarchyCard("Counts as a 7 while it is the top card.", HierarchyRank.SERF);
    let tower = new HierarchyCard("You may discard a card to play this atop any card except the Leper (Requires at least one card in play). Counts as two cards.", HierarchyRank.TOWER, true);
    let surgeon = new HierarchyCard("Return an opponent's card to their hand. Then they return one of your other cards to your hand.", HierarchyRank.SURGEON);
    let knight = new HierarchyCard("May be played atop the Dragon.", HierarchyRank.KNIGHT);
    let usurper = new HierarchyCard("Must be played atop a card with a higher value. A card with a lower value must be played atop this.", HierarchyRank.USURPER);
    let sorcerer = new HierarchyCard("Cards in hands have no abilities.", HierarchyRank.SORCERER);
    let dragon = new HierarchyCard("May be played atop the Baroness.", HierarchyRank.DRAGON);
    let baroness = new HierarchyCard("May only be played when the line has 7 or fewer cards in it.", HierarchyRank.BARONESS, true);
    let highpriest = new HierarchyCard("May only be played atop the Knight, Serf, or Royalty.", HierarchyRank.HIGH_PRIEST);
    let queen = new HierarchyCard("May only be played when the line has the Baroness in it.", HierarchyRank.QUEEN, true);
    let king = new HierarchyCard("May only be played when the line has 7 or more cards in it.", HierarchyRank.KING, true);

    cards.push(imposter);
    cards.push(assassin);
    cards.push(leper);
    cards.push(serf);
    cards.push(tower);

    cards.push(surgeon);
    cards.push(knight);
    cards.push(usurper);
    cards.push(sorcerer);
    cards.push(dragon);

    cards.push(baroness);
    cards.push(highpriest);
    cards.push(queen);
    cards.push(king);

    return new Deck(cards);
}