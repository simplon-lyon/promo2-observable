import Rx from 'rxjs/Rx';
/*
On crée un Observable qui enverra une valeur random tous les x millisecondes, calculées
de manière random également.
*/
export const obsAsync = Rx.Observable.create((observer) => {
    setInterval(() => observer.next('bloup' + Math.random()), Math.random() * 1000);
});

const propositions = ['abc', 'absolu', 'jambon', 'pb & jam', 'problème'];

export function search(terme) {
    return Rx.Observable.from(propositions)
        .filter((valeur) => valeur.match(terme));
}