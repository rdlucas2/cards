import { GenericCard } from './GenericCard';
import { CardState } from '../Card';
import { CardView } from '../CardView';

export class GenericCardHtmlView implements CardView {
    render(card: GenericCard): void {
        var elem = document.createElement('div');
        elem.setAttribute('style', 'background-color:white;');
        var classes = 'card generic-card ' + card.state + ' ' + card.orientation;

        if (card.state !== CardState.DOWN) {
            var topOfCard = document.createElement('div');
            topOfCard.innerText = card.name;

            var centerOfCard = document.createElement('div');
            centerOfCard.setAttribute('class', 'center');
            centerOfCard.setAttribute('style', 'display: block;');
            var img = document.createElement('img');
            img.src = card.art.href;
            img.setAttribute('style', 'width:100%; height:99%;');
            centerOfCard.appendChild(img);

            var bottomOfCard = document.createElement('div');
            bottomOfCard.innerText = card.content;

            elem.appendChild(topOfCard);
            elem.appendChild(centerOfCard);
            elem.appendChild(bottomOfCard);
        }
        elem.setAttribute('class', classes);
        document.body.appendChild(elem);
    }
}