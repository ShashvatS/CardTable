import { gamedata } from "./logic/gamedata";
import { integer } from "random-js";

export default function shuffle(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        const randomIndex = integer(0, currentIndex)(gamedata.state.random.mt);
        console.log(randomIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        let temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    gamedata.update_random();

    return array;
}