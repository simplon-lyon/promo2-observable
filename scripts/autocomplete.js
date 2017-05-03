import Rx from 'rxjs/Rx';
import { search } from './fake-async';

//On crée un observable à partir de l'event onDOMContentLoaded du document
const obsDomLoaded = Rx.Observable.fromEvent(document, 'DOMContentLoaded');

//On utilise ce premier observable pour en créer un second qui souscrira à un Observable interne
//au moment où celui ci émettra une valeur
//On modifie ensuite la valeur de cette observable en prenant directement la value de l'élément
//sélectionné par l'observable interne
const obsKeyUp = obsDomLoaded
    .switchMap((event) => Rx.Observable.fromEvent(event.target.getElementById('input'), 'keyup'))
    .map((event) => event.target.value);

const obsSearch = obsKeyUp
    .switchMap((valeur) => search(valeur));

//On souscrit directement à l'observable keyup qui nous passera la valeur de l'input en temps réél
obsKeyUp.subscribe((valeur) => {
    let para = document.getElementById('para');
    para.innerHTML = '';
});

obsSearch
    .subscribe((props) =>
        document.getElementById('para')
        .appendChild(document.createTextNode(props + ','))
    );

// obsDomLoaded.subscribe(() => {
//     let input = document.getElementById('input');
//     let para = document.getElementById('para');
//     let obsKeyUp = Rx.Observable.fromEvent(input, 'keyup');

//     obsKeyUp.subscribe((event) => para.innerHTML = event.target.value);
// });