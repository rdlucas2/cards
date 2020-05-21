import { HierarchyCard, HierarchyRank, HierarchyColor } from './HierarchyCard';
import { CardState } from '../Card';
import { CardView } from '../CardView';

export class HierarchyCardHtmlView implements CardView {
    render(card: HierarchyCard): HTMLElement {
        var elem = document.createElement('div');
        var classes = 'card hierarchy-card draggable ' + card.state + ' ' + card.orientation;

        if (card.state !== CardState.DOWN) {
            classes += ' ' + HierarchyRank[card.rank] + ' ' + HierarchyColor[card.color];
            var topOfCard = document.createElement('div');
            topOfCard.setAttribute("class", "hierarchy-upper-right");
            topOfCard.innerText = HierarchyRank[card.rank].replace(/_/g, ' ');// + ' ' + card.rank;
            if (card.isRoyalty) {
                topOfCard.innerText += ' ♛'
            }
            elem.appendChild(topOfCard);

            var centerOfCard = document.createElement('div');
            centerOfCard.setAttribute("class", "hierarchy-center");
            centerOfCard.innerText = card.ability;
            elem.appendChild(centerOfCard);

            var bottomOfCard = document.createElement('div');
            bottomOfCard.setAttribute("class", "hierarchy-lower-left");
            if (card.rank === HierarchyRank.IMPOSTER) {
                bottomOfCard.innerText = '?';
            } else {
                bottomOfCard.innerText = `${card.rank}`;
            }
            elem.appendChild(bottomOfCard);
        }
        elem.setAttribute('class', classes);
        return elem;
        //document.body.appendChild(elem);
    }
}