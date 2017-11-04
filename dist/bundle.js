!function r(n,o,t){function e(i,s){if(!o[i]){if(!n[i]){var u="function"==typeof require&&require;if(!s&&u)return u(i,!0);if(a)return a(i,!0);var f=new Error("Cannot find module '"+i+"'");throw f.code="MODULE_NOT_FOUND",f}var c=o[i]={exports:{}};n[i][0].call(c.exports,function(r){var o=n[i][1][r];return e(o||r)},c,c.exports,r,n,o,t)}return o[i].exports}for(var a="function"==typeof require&&require,i=0;i<t.length;i++)e(t[i]);return e}({1:[function(r,n,o){"use strict";o.__esModule=!0;var t=function(){function r(r){this.cards=r}return r.prototype.shuffle=function(){var r,n,o;for(o=this.cards.length-1;o>0;o--)r=Math.floor(Math.random()*(o+1)),n=this.cards[o],this.cards[o]=this.cards[r],this.cards[r]=n},r.prototype.add=function(r){this.cards.push(r)},r.prototype.NoCardsToRemoveError=function(){if(0===this.cards.length)throw"NO CARDS TO REMOVE!"},r.prototype.removeCardByCard=function(r){this.NoCardsToRemoveError();var n=this.cards.indexOf(r);if(-1!==n){var o=this.cards[n];return this.cards.splice(n,1),o}throw"CARD NOT FOUND!"},r.prototype.removeCardByName=function(r){throw this.NoCardsToRemoveError(),"NOT IMPLEMENTED"},r.prototype.removeCardByIndex=function(r){this.NoCardsToRemoveError();var n=this.cards[r];return this.cards.splice(r,1),n},r.prototype.takeFromTop=function(r){for(var n=new Array,o=0;o<r;o++)n.push(this.cards.pop());return n},r.prototype.random=function(){return this.cards[Math.floor(Math.random()*(this.cards.length-0+1)+0)]},r}();o.default=t},{}],2:[function(r,n,o){"use strict";o.__esModule=!0;var t=r("../Deck"),e=r("./PlayingCard");o.default=function(){var r=new Array;for(var n in e.Suit)if(!isNaN(Number(n))){var o=n;for(var a in e.Rank)if(!isNaN(Number(a))){var i=a;r.push(new e.PlayingCard(e.Rank[i],e.Suit[o]))}}return new t.default(r)}},{"../Deck":1,"./PlayingCard":3}],3:[function(r,n,o){"use strict";o.__esModule=!0;!function(r){r[r.SPADES=0]="SPADES",r[r.CLUBS=1]="CLUBS",r[r.HEARTS=2]="HEARTS",r[r.DIAMONDS=3]="DIAMONDS"}(o.Suit||(o.Suit={}));!function(r){r[r.ACE=1]="ACE",r[r.TWO=2]="TWO",r[r.THREE=3]="THREE",r[r.FOUR=4]="FOUR",r[r.FIVE=5]="FIVE",r[r.SIX=6]="SIX",r[r.SEVEN=7]="SEVEN",r[r.EIGHT=8]="EIGHT",r[r.NINE=9]="NINE",r[r.TEN=10]="TEN",r[r.JACK=11]="JACK",r[r.QUEEN=12]="QUEEN",r[r.KING=13]="KING"}(o.Rank||(o.Rank={}));var t=function(){return function(r,n){this.name=r+" of "+n,this.rank=r,this.suit=n}}();o.PlayingCard=t},{}],4:[function(r,n,o){"use strict";o.__esModule=!0;var t=r("../Deck"),e=r("./UnoCard");o.default=function(){var r=new Array;for(var n in e.UnoColor)if(isNaN(Number(n))&&"BLACK"!==n){var o=n;for(var a in e.UnoRank)if(isNaN(Number(a))){var i=a;if("ZERO"===a||-1!==a.indexOf("WILD")){var s=e.UnoColor[o];-1!==a.indexOf("WILD")&&(s=e.UnoColor.BLACK),r.push(new e.UnoCard(s,e.UnoRank[i]))}else r.push(new e.UnoCard(e.UnoColor[o],e.UnoRank[i])),r.push(new e.UnoCard(e.UnoColor[o],e.UnoRank[i]))}}return new t.default(r)}},{"../Deck":1,"./UnoCard":5}],5:[function(r,n,o){"use strict";o.__esModule=!0;!function(r){r.RED="RED",r.GREEN="GREEN",r.BLUE="BLUE",r.YELLOW="YELLOW",r.BLACK=""}(o.UnoColor||(o.UnoColor={}));!function(r){r.ZERO="0",r.ONE="1",r.TWO="2",r.THREE="3",r.FOUR="4",r.FIVE="5",r.SIX="6",r.SEVEN="7",r.EIGHT="8",r.NINE="9",r.DRAWTWO="DRAW TWO",r.SKIP="SKIP",r.REVERSE="REVERSE",r.WILD="WILD",r.WILDFOUR="WILD DRAW FOUR"}(o.UnoRank||(o.UnoRank={}));var t=function(){return function(r,n){this.name=(r+" "+n).trim(),this.rank=n,this.color=r}}();o.UnoCard=t},{}],6:[function(r,n,o){"use strict";o.__esModule=!0;var t=r("./cards/PlayingCards/DeckOfPlayingCards"),e=r("./cards/Uno/DeckOfUnoCards");!function(){function r(r){for(var n=0;n<r.cards.length;n++){var o=document.createElement("p");o.innerText=r.cards[n].name,document.body.appendChild(o)}}var n=t.default();n.shuffle(),r(n);var o=e.default();o.shuffle(),r(o)}()},{"./cards/PlayingCards/DeckOfPlayingCards":2,"./cards/Uno/DeckOfUnoCards":4}]},{},[6]);