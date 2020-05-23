import { Card } from './cards/Card';
import { HierarchyCard, HierarchyColor } from './cards/HierarchyCards/HierarchyCard';
import DeckOfHierarchyCards from './cards/HierarchyCards/DeckOfHierarchyCards';
import { HierarchyCardHtmlView } from './cards/HierarchyCards/HierarchyCardHtmlView'
import { firebaseConfig } from './firebaseConfig'
import * as firebase from 'firebase';

(() => {
    function getParameterByName(name, url = null): string {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    function getDraggableAreaElement(): HTMLElement {
        return document.getElementById("draggableArea");
    }

    function addCardToFirebase(card: Card) {
        let el = new HierarchyCardHtmlView().render(<HierarchyCard>card);
        firebase.database().ref(firebaseRef + el.className).set({
            init: true
        });
    }

    function renderCard(card: Card) {
        let el = new HierarchyCardHtmlView().render(<HierarchyCard>card);
        getDraggableAreaElement().appendChild(el);
    }

    function writeCardPositionData(cardId, initialX, initialY, currentX, currentY, xOffset, yOffset) {
        firebase.database().ref(firebaseRef + cardId).update({
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
        let index = draggedItems.findIndex((v, i, o) => {
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
        el.setAttribute('style', 'position:absolute; top: ' + currentY + 'px; left: ' + currentX + 'px; z-index: 9999');
        el.parentElement.insertBefore(el, el.parentElement.lastChild.nextSibling);
        writeCardPositionData(el.className, initialX, initialY, currentX, currentY, xOffset, yOffset);
    }

    function drag(e) {
        let index = draggedItems.findIndex((v) => {
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
        let index = draggedItems.findIndex((v) => {
            return e.srcElement.parentElement === v.elem;
        });
        if (index > -1) {
            draggedItems[index].initialX = draggedItems[index].currentX;
            draggedItems[index].initialY = draggedItems[index].currentY;
            draggedItems[index].active = false;
            e.srcElement.parentElement.setAttribute('style', e.srcElement.parentElement.getAttribute('style').replace('z-index: 9999', 'z-index: 2'));
            // e.srcElement.parentElement.parentElement.insertBefore(e.srcElement.parentElement, e.srcElement.parentElement.parentElement.lastChild.nextSibling);
        }
    }

    function removeCardEvents(): void {
        let draggableElements = document.getElementsByClassName('draggable');
        for (let i = 0; i < draggableElements.length; i++) {
            draggableElements[i].removeEventListener('touchstart', dragStart);
            draggableElements[i].removeEventListener('touchend', dragEnd);
            draggableElements[i].removeEventListener('touchmove', drag);

            draggableElements[i].removeEventListener('mousedown', dragStart);
            draggableElements[i].removeEventListener('mouseup', dragEnd);
            draggableElements[i].removeEventListener('mousemove', drag);
        }
    }

    function bindCardEvents(): void {
        let draggableElements = document.getElementsByClassName('draggable');
        for (let i = 0; i < draggableElements.length; i++) {
            draggableElements[i].addEventListener('touchstart', dragStart);
            draggableElements[i].addEventListener('touchend', dragEnd);
            draggableElements[i].addEventListener('touchmove', drag);

            draggableElements[i].addEventListener('mousedown', dragStart);
            draggableElements[i].addEventListener('mouseup', dragEnd);
            draggableElements[i].addEventListener('mousemove', drag);
        }
    }

    let roomId = getParameterByName('room');

    if (!roomId) {
        //TODO: display box to enter room id and update url
        let joinRoomEl = document.getElementById('joinRoom');
        joinRoomEl.setAttribute('class', '');

        let roomInput = document.getElementById('roomid');
        roomInput.addEventListener('keyup', (event) => {
            if (event.keyCode === 13) {
                event.preventDefault();
                window.location.href = window.location.href + '?room=' + (<HTMLInputElement>roomInput).value;
            }
        })
        return;
    } else {
        var draggedItems: any[] = [];
        var firebaseRef = 'cards-' + roomId + '/';
        let gameEl = document.getElementById('game');
        gameEl.setAttribute('class', '');

        let app = firebase.initializeApp(firebaseConfig);

        document.body.addEventListener('mouseup', (e) => {
            for (let i = 0; i < draggedItems.length; i++) {
                draggedItems[i].active = false;
                let el = document.getElementsByClassName(draggedItems[i].elem.getAttribute('class'))[0];
                el.setAttribute('style', el.getAttribute('style').replace('z-index: 9999', 'z-index: 2'));
                // el.parentElement.insertBefore(el, el.parentElement.lastChild.nextSibling);
            }
        });

        document.getElementById('deal').addEventListener('click', (e) => {
            firebase.database().ref(firebaseRef).remove();
            draggedItems = [];
            getDraggableAreaElement().innerHTML = '';
            let hierarchyDeck = DeckOfHierarchyCards();
            hierarchyDeck.shuffle();
            hierarchyDeck.cards.forEach((e: HierarchyCard, i: number) => {
                e.color = i < 7 ? HierarchyColor.LIGHT : HierarchyColor.DARK;
                addCardToFirebase(e);
            });
        });

        firebase.database().ref(firebaseRef).on('child_added', (snapshot) => {
            //console.log(snapshot);
            let tmp = snapshot.key.split(' ');
            let name = tmp[tmp.length - 2];
            let color = tmp[tmp.length - 1];
            let tmpDeck = DeckOfHierarchyCards();
            let card = <HierarchyCard>tmpDeck.removeCardByName(name);
            card.color = color === 'LIGHT' ? HierarchyColor.LIGHT : HierarchyColor.DARK;
            renderCard(card);
            if (!snapshot.child('init').val()) {
                let el = document.getElementsByClassName(snapshot.key)[0];
                let index = draggedItems.findIndex((v) => {
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
                    index = draggedItems.length - 1;
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
                //el.setAttribute('style', el.getAttribute('style').replace('z-index: 9999', 'z-index: 2'));
                // let transformString = snapshot.child('position').val();
                // (<any>el).style.transform = transformString;
            }
            removeCardEvents();
            bindCardEvents();
        });

        firebase.database().ref(firebaseRef).on('child_changed', (snapshot) => {
            //console.log(snapshot);
            if (!snapshot.child('init').val()) {
                let el = document.getElementsByClassName(snapshot.key)[0];
                let index = draggedItems.findIndex((v) => {
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
                    index = draggedItems.length - 1;
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
                //el.setAttribute('style', el.getAttribute('style').replace('z-index: 9999', 'z-index: 2'));

            }
        });

        firebase.database().ref(firebaseRef).on('child_removed', (snapshot) => {
            draggedItems = [];
            getDraggableAreaElement().innerHTML = '';
        });
    }
})();