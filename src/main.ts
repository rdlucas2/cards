import { Card } from './cards/Card';
import { HierarchyCard, HierarchyColor } from './cards/HierarchyCards/HierarchyCard';
import DeckOfHierarchyCards from './cards/HierarchyCards/DeckOfHierarchyCards';
import { HierarchyCardHtmlView } from './cards/HierarchyCards/HierarchyCardHtmlView'
import { firebaseConfig } from './firebaseConfig'
import * as firebase from 'firebase';

(() => {
    function getDraggableAreaElement(): HTMLElement {
        return document.getElementById("draggableArea");
    }

    function addCardToFirebase(card: Card) {
        var el = new HierarchyCardHtmlView().render(<HierarchyCard>card);
        // getDraggableAreaElement().appendChild(el);
        firebase.database().ref('cards/' + el.className).set({
            init: true
        });
    }

    function renderCard(card: Card) {
        var el = new HierarchyCardHtmlView().render(<HierarchyCard>card);
        getDraggableAreaElement().appendChild(el);
    }

    function writeCardPositionData(cardId, transformString) {
        firebase.database().ref('cards/' + cardId).update({
            position: transformString,
            init: false
        });
    }

    let app = firebase.initializeApp(firebaseConfig);

    var draggedItems: any[] = [];

    function dragStart(e) {
        var index = draggedItems.findIndex((v, i, o) => {
            return e.srcElement.parentElement === v.elem;
        });
        if (index < 0) {
            draggedItems.push({
                initialX: (e.type === "touchstart") ? (e.touches[0].clientX - 0) : e.clientX - 0,
                initialY: (e.type === "touchstart") ? (e.touches[0].clientY - 0) : e.clientY - 0,
                currentX: 0,
                currentY: 0,
                xOffset: 0,
                yOffset: 0,
                elem: e.srcElement.parentElement,
                active: true
            });
        } else {
            draggedItems[index].active = true;
            draggedItems[index].initialX = (e.type === "touchstart") ? (e.touches[0].clientX - draggedItems[index].xOffset) : e.clientX - draggedItems[index].xOffset;
            draggedItems[index].initialY = (e.type === "touchstart") ? (e.touches[0].clientY - draggedItems[index].yOffset) : e.clientY - draggedItems[index].yOffset;
        }
    }

    function setTranslate(xPos, yPos, el) {
        let transformString = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
        el.style.transform = transformString;
        writeCardPositionData(el.className, transformString)
    }

    function drag(e) {
        var index = draggedItems.findIndex((v) => {
            return e.srcElement.parentElement === v.elem;
        });
        if (index > -1 && draggedItems[index].active) {
            e.preventDefault();

            if (e.type === "touchmove") {
                draggedItems[index].currentX = e.touches[0].clientX - draggedItems[index].initialX;
                draggedItems[index].currentY = e.touches[0].clientY - draggedItems[index].initialY;
            } else {
                draggedItems[index].currentX = e.clientX - draggedItems[index].initialX;
                draggedItems[index].currentY = e.clientY - draggedItems[index].initialY;
            }

            draggedItems[index].xOffset = draggedItems[index].currentX;
            draggedItems[index].yOffset = draggedItems[index].currentY;

            setTranslate(draggedItems[index].currentX, draggedItems[index].currentY, draggedItems[index].elem);
        }
    }

    function dragEnd(e) {
        var index = draggedItems.findIndex((v) => {
            return e.srcElement.parentElement === v.elem;
        });
        if (index > -1) {
            draggedItems[index].initialX = draggedItems[index].currentX;
            draggedItems[index].initialY = draggedItems[index].currentY;
            draggedItems[index].active = false;
        }
    }

    document.body.addEventListener('mouseup', (e) => {
        for (var i = 0; i < draggedItems.length; i++) {
            draggedItems[i].active = false;
        }
    });

    function removeCardEvents(): void {
        var draggableElements = document.getElementsByClassName('draggable');
        for (var i = 0; i < draggableElements.length; i++) {
            draggableElements[i].removeEventListener('touchstart', dragStart);
            draggableElements[i].removeEventListener('touchend', dragEnd);
            draggableElements[i].removeEventListener('touchmove', drag);

            draggableElements[i].removeEventListener('mousedown', dragStart);
            draggableElements[i].removeEventListener('mouseup', dragEnd);
            draggableElements[i].removeEventListener('mousemove', drag);
        }
    }

    function bindCardEvents(): void {
        var draggableElements = document.getElementsByClassName('draggable');
        for (var i = 0; i < draggableElements.length; i++) {
            draggableElements[i].addEventListener('touchstart', dragStart);
            draggableElements[i].addEventListener('touchend', dragEnd);
            draggableElements[i].addEventListener('touchmove', drag);

            draggableElements[i].addEventListener('mousedown', dragStart);
            draggableElements[i].addEventListener('mouseup', dragEnd);
            draggableElements[i].addEventListener('mousemove', drag);
        }
    }

    firebase.database().ref('cards/').on('child_added', (snapshot) => {
        console.log(snapshot);
        var tmp = snapshot.key.split(' ');
        var name = tmp[tmp.length - 2];
        var color = tmp[tmp.length - 1];
        var tmpDeck = DeckOfHierarchyCards();
        let card = <HierarchyCard>tmpDeck.removeCardByName(name);
        card.color = color === 'LIGHT' ? HierarchyColor.LIGHT : HierarchyColor.DARK;
        renderCard(card);
        if (!snapshot.child('init').val()) {
            let el = document.getElementsByClassName(snapshot.key)[0];
            let transformString = snapshot.child('position').val();
            (<any>el).style.transform = transformString;
        }
        removeCardEvents();
        bindCardEvents();
    });

    firebase.database().ref('cards/').on('child_changed', (snapshot) => {
        console.log(snapshot);
        if (!snapshot.child('init').val()) {
            let el = document.getElementsByClassName(snapshot.key)[0];
            let transformString = snapshot.child('position').val();
            (<any>el).style.transform = transformString;
        }
    });

    firebase.database().ref('cards/').on('child_removed', (snapshot) => {
        getDraggableAreaElement().innerHTML = '';
    });

    document.getElementById('deal').addEventListener('click', (e) => {
        firebase.database().ref('cards/').remove();

        getDraggableAreaElement().innerHTML = '';
        let hierarchyDeck = DeckOfHierarchyCards();
        hierarchyDeck.shuffle();
        hierarchyDeck.cards.forEach((e: HierarchyCard, i: number) => {
            e.color = i < 7 ? HierarchyColor.LIGHT : HierarchyColor.DARK;
            addCardToFirebase(e);
        });
    });
})();