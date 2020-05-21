import { UnoCard } from './UnoCard';
import { CardState } from '../Card';
import { CardView } from '../CardView';

export class UnoCardHtmlView implements CardView {
    render(card: UnoCard): void {
        var elem = document.createElement('div');
        var classes = 'card uno-card ' + card.state + ' ' + card.orientation;

        if (card.state !== CardState.DOWN) {
            classes += ' ' + card.rank + ' ' + card.color;
            var centerOfCard = document.createElement('div');
            centerOfCard.setAttribute('class', 'center');
            centerOfCard.innerText = card.name.replace(/_/g, ' ');
            elem.appendChild(centerOfCard);
        }
        elem.setAttribute('class', classes);
        document.body.appendChild(elem);
    }
}