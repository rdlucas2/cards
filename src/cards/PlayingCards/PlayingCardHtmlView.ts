import { PlayingCard } from './PlayingCard';
import { CardState } from '../Card';
import { CardView } from '../CardView';

export class PlayingCardHtmlView implements CardView {
    private buildCardCornerHtml(id: string, symbol: string, cssClass: string): HTMLElement {
        var identifier = document.createElement('div');
        identifier.innerHTML = id;

        var suit = document.createElement('div');
        suit.innerHTML = symbol;

        var cornerContent = document.createElement('div');
        cornerContent.appendChild(identifier);
        cornerContent.appendChild(suit);

        var corner = document.createElement('div');
        corner.appendChild(cornerContent);
        corner.setAttribute('class', cssClass);

        return corner;
    }

    public render(card: PlayingCard): void {
        var elem = document.createElement('div');

        var classes = 'card playing-card ' + card.state + ' ' + card.orientation;

        if (card.state !== CardState.DOWN) {
            var centerOfCard = document.createElement('div');
            centerOfCard.setAttribute('class', 'center');
            classes += ' ' + card.rank + ' ' + card.suit;
            var symbol = '';
            switch (card.suit.toString()) {
                case "SPADES": //Suit.SPADES:
                    symbol = '&spades;';
                    break;
                case "CLUBS": //Suit.CLUBS:
                    symbol = '&clubs;';
                    break;
                case "HEARTS": //Suit.HEARTS:
                    symbol = '&hearts;';
                    break;
                case "DIAMONDS": //Suit.DIAMONDS:
                    symbol = '&diams;';
                    break;
            }

            var cornerLetter = '';
            switch (card.rank.toString()) {
                case "ACE":
                    cornerLetter = 'A';
                    centerOfCard.innerHTML = symbol;
                    break;
                case "TWO":
                    cornerLetter = '2';
                    centerOfCard.innerHTML = symbol + '<br>' + symbol;
                    break;
                case "THREE":
                    cornerLetter = '3';
                    centerOfCard.innerHTML = symbol + '<br>' + symbol + '<br>' + symbol;
                    break;
                case "FOUR":
                    cornerLetter = '4';
                    centerOfCard.innerHTML = symbol + ' ' + symbol + '<br>' + symbol + ' ' + symbol;
                    break;
                case "FIVE":
                    cornerLetter = '5';
                    centerOfCard.innerHTML = symbol + ' ' + symbol + '<br>' + symbol + '<br>' + symbol + ' ' + symbol;
                    break;
                case "SIX":
                    cornerLetter = '6';
                    centerOfCard.innerHTML = symbol + ' ' + symbol + '<br>' + symbol + ' ' + symbol + '<br>' + symbol + ' ' + symbol;
                    break;
                case "SEVEN":
                    cornerLetter = '7';
                    centerOfCard.innerHTML = symbol + ' ' + symbol + '<br>' + symbol + ' ' + symbol + ' ' + symbol + '<br>' + symbol + ' ' + symbol;
                    break;
                case "EIGHT":
                    cornerLetter = '8';
                    centerOfCard.innerHTML = symbol + ' ' + symbol + '<br>' + symbol + ' ' + symbol + '<br>' + symbol + ' ' + symbol + '<br>' + symbol + ' ' + symbol;
                    break;
                case "NINE":
                    cornerLetter = '9';
                    centerOfCard.innerHTML = symbol + ' ' + symbol + ' ' + symbol + '<br>' + symbol + ' ' + symbol + ' ' + symbol + '<br>' + symbol + ' ' + symbol + ' ' + symbol;
                    break;
                case "TEN":
                    cornerLetter = '10';
                    centerOfCard.innerHTML = symbol + ' ' + symbol + ' ' + symbol + '<br>' + symbol + ' ' + symbol + '<br>' + symbol + ' ' + symbol + ' ' + symbol + '<br>' + symbol + ' ' + symbol;
                    break;
                case "JACK":
                    cornerLetter = 'J';
                    centerOfCard.innerHTML = document.getElementById('bart').outerHTML;
                    break;
                case "QUEEN":
                    cornerLetter = 'Q';
                    centerOfCard.innerHTML = document.getElementById('marge').outerHTML;
                    break;
                case "KING":
                    cornerLetter = 'K';
                    centerOfCard.innerHTML = document.getElementById('homer').outerHTML;
                    break;
            }

            var upperLeftCorner = this.buildCardCornerHtml(cornerLetter, symbol, 'upper-left');
            var lowerRightCorner = this.buildCardCornerHtml(cornerLetter, symbol, 'lower-right');
            elem.appendChild(upperLeftCorner);
            elem.appendChild(centerOfCard);
            elem.appendChild(lowerRightCorner);

            elem.setAttribute('class', classes);
            document.body.appendChild(elem);
        }
    }
}