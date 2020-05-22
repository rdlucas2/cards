import { Card } from './cards/Card';
import { HierarchyCard, HierarchyColor } from './cards/HierarchyCards/HierarchyCard';
import DeckOfHierarchyCards from './cards/HierarchyCards/DeckOfHierarchyCards';
import { HierarchyCardHtmlView } from './cards/HierarchyCards/HierarchyCardHtmlView'
import { firebaseConfig } from './firebaseConfig'
import * as firebase from 'firebase';

(() => {
    let app = firebase.initializeApp(firebaseConfig);
    var draggedItems: any[] = [];

    document.body.addEventListener('mouseup', (e) => {
        for (var i = 0; i < draggedItems.length; i++) {
            draggedItems[i].active = false;
        }
    });

    document.getElementById('deal').addEventListener('click', (e) => {
        firebase.database().ref('cards/').remove();
        draggedItems = [];
        getDraggableAreaElement().innerHTML = '';
        let hierarchyDeck = DeckOfHierarchyCards();
        hierarchyDeck.shuffle();
        hierarchyDeck.cards.forEach((e: HierarchyCard, i: number) => {
            e.color = i < 7 ? HierarchyColor.LIGHT : HierarchyColor.DARK;
            addCardToFirebase(e);
        });
    });

    function getDraggableAreaElement(): HTMLElement {
        return document.getElementById("draggableArea");
    }

    function addCardToFirebase(card: Card) {
        var el = new HierarchyCardHtmlView().render(<HierarchyCard>card);
        firebase.database().ref('cards/' + el.className).set({
            init: true
        });
    }

    function renderCard(card: Card) {
        var el = new HierarchyCardHtmlView().render(<HierarchyCard>card);
        getDraggableAreaElement().appendChild(el);
    }

    function writeCardPositionData(cardId, initialX, initialY, currentX, currentY, xOffset, yOffset) {
        firebase.database().ref('cards/' + cardId).update({
            initialX: initialX,
            initialY: initialY,
            currentX: currentX,
            currentY: currentY,
            xOffset: xOffset,
            yOffset: yOffset,
            init: false
        });
    }

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

    function setTranslate(initialX, initialY, currentX, currentY, xOffset, yOffset, el) {
        // let transformString = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
        // el.style.transform = transformString;
        el.setAttribute('style', 'position:absolute; top: ' + currentY + 'px; left: ' + currentX + 'px;');
        writeCardPositionData(el.className, initialX, initialY, currentX, currentY, xOffset, yOffset);
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

            setTranslate(
                draggedItems[index].initialX,
                draggedItems[index].initialY,
                draggedItems[index].currentX,
                draggedItems[index].currentY,
                draggedItems[index].xOffset,
                draggedItems[index].yOffset,
                draggedItems[index].elem);
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
        //console.log(snapshot);
        var tmp = snapshot.key.split(' ');
        var name = tmp[tmp.length - 2];
        var color = tmp[tmp.length - 1];
        var tmpDeck = DeckOfHierarchyCards();
        let card = <HierarchyCard>tmpDeck.removeCardByName(name);
        card.color = color === 'LIGHT' ? HierarchyColor.LIGHT : HierarchyColor.DARK;
        renderCard(card);
        if (!snapshot.child('init').val()) {
            let el = document.getElementsByClassName(snapshot.key)[0];
            var index = draggedItems.findIndex((v) => {
                return el === v.elem;
            });
            if (index < 0) {
                draggedItems.push({
                    initialX: snapshot.child('initialX').val(),
                    initialY: snapshot.child('initialY').val(),
                    currentX: snapshot.child('currentX').val(),
                    currentY: snapshot.child('currentY').val(),
                    xOffset: snapshot.child('xOffset').val(),
                    yOffset: snapshot.child('yOffset').val(),
                    elem: el,
                    active: true
                });
                index = draggedItems[draggedItems.length - 1];
            } else {
                draggedItems[index].initialX = snapshot.child('initialX').val();
                draggedItems[index].initialY = snapshot.child('initialY').val();
                draggedItems[index].currentX = snapshot.child('currentX').val();
                draggedItems[index].currentY = snapshot.child('currentY').val();
                draggedItems[index].xOffset = snapshot.child('xOffset').val();
                draggedItems[index].yOffset = snapshot.child('yOffset').val();
            }

            setTranslate(
                draggedItems[index].initialX,
                draggedItems[index].initialY,
                draggedItems[index].currentX,
                draggedItems[index].currentY,
                draggedItems[index].xOffset,
                draggedItems[index].yOffset,
                draggedItems[index].elem);
            // let transformString = snapshot.child('position').val();
            // (<any>el).style.transform = transformString;
        }
        removeCardEvents();
        bindCardEvents();
    });

    firebase.database().ref('cards/').on('child_changed', (snapshot) => {
        //console.log(snapshot);
        if (!snapshot.child('init').val()) {
            let el = document.getElementsByClassName(snapshot.key)[0];
            var index = draggedItems.findIndex((v) => {
                return el === v.elem;
            });
            if (index < 0) {
                draggedItems.push({
                    initialX: snapshot.child('initialX').val(),
                    initialY: snapshot.child('initialY').val(),
                    currentX: snapshot.child('currentX').val(),
                    currentY: snapshot.child('currentY').val(),
                    xOffset: snapshot.child('xOffset').val(),
                    yOffset: snapshot.child('yOffset').val(),
                    elem: el,
                    active: true
                });
                index = draggedItems[draggedItems.length - 1];
            } else {
                draggedItems[index].initialX = snapshot.child('initialX').val();
                draggedItems[index].initialY = snapshot.child('initialY').val();
                draggedItems[index].currentX = snapshot.child('currentX').val();
                draggedItems[index].currentY = snapshot.child('currentY').val();
                draggedItems[index].xOffset = snapshot.child('xOffset').val();
                draggedItems[index].yOffset = snapshot.child('yOffset').val();
            }

            setTranslate(
                draggedItems[index].initialX,
                draggedItems[index].initialY,
                draggedItems[index].currentX,
                draggedItems[index].currentY,
                draggedItems[index].xOffset,
                draggedItems[index].yOffset,
                draggedItems[index].elem);
            // let transformString = snapshot.child('position').val();
            // (<any>el).style.transform = transformString;
        }
    });

    firebase.database().ref('cards/').on('child_removed', (snapshot) => {
        draggedItems = [];
        getDraggableAreaElement().innerHTML = '';
    });

})();