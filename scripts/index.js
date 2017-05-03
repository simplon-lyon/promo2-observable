import Rx from 'rxjs/Rx';
import { obsAsync } from './fake-async';



// const souscription = obsAsync.take(3).subscribe((donnee) => console.log(donnee));
const souscription = obsAsync.subscribe((donnee) => console.log(donnee));
setTimeout(() => souscription.unsubscribe(), 2000);


/*
Un Observable est un flux de données que l'on pourra manipuler avec les opérateurs fournis
par rxjs. N'importe quoi peut être transformé en Observable, le concept de la programmation
réactive étant de ne manipuler que des flux : flux de données, flux d'event, etc.
*/


//On crée un tableau de données numériques
const tableau = [1, 2, 3, 4];
//On utilise la méthode from pour créer un Observable à partir de ce tableau
const obsTableau = Rx.Observable.from(tableau);
//On "parcours" les données en souscrivant à l'Observable créé
//On peut également en deuxième argument indiquer une action à faire en cas d'erreur dans le flux
//Et en troisième argument indiquer une action à effectuer une fois arrivé au bout du flux
// obsTableau.subscribe((donnee) => console.log(donnee),
//     (error) => console.error(error),
//     () => console.log('fin de notre observable'));

/*
On peut créer un Observable de zéro en utilisant la méthode create, on fournira alors
avec la méthode .next() les données à envoyer lors de la souscription.
On terminera notre Observable par un .complete()
*/
const monObservable = Rx.Observable.create((observer) => {
    observer.next('a');
    observer.next('b');
    observer.next('c');
    observer.complete();
});
//On souscrit à l'observable créé comme à n'importe quel autre.
// monObservable.subscribe((donnee) => console.log(donnee),
//     (error) => console.error(error),
//     () => console.log('completed'));

/*
Chaque observable possède une batterie de méthode qui modifiera le flux ou la manière dont
le flux se comporte. Ces méthodes sont communes à tous les observables (ce qui permet de traiter
toutes les données de la même manière).
On peut par exemple concatenner deux observable ensemble avec la méthode concat (le flux de l'un
ne commencera que lorsque le flux de l'autre sera terminé)
On peut également modifier les données de nos observables avec la méthode .map() qui prend en 
argument la fonction de modification à appliquer.
*/
const obsConcat = obsTableau.concat(monObservable)
    .map((donnee) => "La donnée est : " + donnee);

obsConcat.subscribe((donnee) => console.log(donnee),
    () => console.error('erreur'),
    () => console.log('completed concat'));