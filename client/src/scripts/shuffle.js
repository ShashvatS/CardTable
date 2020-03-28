import { gamedata } from "./logic/gamedata";
import { integer } from "random-js";

// export default function shuffle(array) {
//     var currentIndex = array.length,
//         temporaryValue, randomIndex;

//     // While there remain elements to shuffle...
//     while (0 != currentIndex) {
//         // Pick a remaining element...
//         randomIndex = integer(0, currentIndex)(gamedata.state.random.mt);
//         console.log(randomIndex);
//         currentIndex -= 1;

//         // And swap it with the current element.
//         temporaryValue = array[currentIndex];
//         array[currentIndex] = array[randomIndex];
//         array[randomIndex] = temporaryValue;
//     }

//     gamedata.update_random();

//     return array;
// }

export default function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        console.log(gamedata.state.random.mt.next());
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

