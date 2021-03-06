class CardSet {
    constructor(numCards, images, cardSubsets, cardSubsetLabels, cardSubsetNums) {
        this.numCards = numCards;
        this.images = images;
        this.cardSubsets = cardSubsets;
        this.cardSubsetLabels = cardSubsetLabels;
        this.cardSubsetNums = cardSubsetNums;
    }
}

function makePlayingCardsSet() {
    //these functions are taken from playfish...
    function int2filenameOld(card) {
        const type = card % 6;
        const set = (card - type) / 6;

        if (set === 8) {
            if (type === 0) {
                return "black_joker.png";
            } else if (type === 1) {
                return "red_joker.png";
            } else if (type === 2) {
                return "8_of_clubs.png";
            } else if (type === 3) {
                return "8_of_diamonds.png";
            } else if (type === 4) {
                return "8_of_spades.png";
            } else if (type === 5) {
                return "8_of_hearts.png";
            }

        } else if (set % 2 === 0) {
            const stringsarr = ["9", "10", "jack", "queen", "king", "ace"];
            const suitsarr = ["clubs", "diamonds", "spades", "hearts"];
            return stringsarr[type] + "_of_" + suitsarr[set / 2] + ".png";
        } else if (set % 2 === 1) {
            const stringsarr = ["2", "3", "4", "5", "6", "7"];
            const suitsarr = ["hearts", "spades", "diamonds", "clubs"];
            return stringsarr[type] + "_of_" + suitsarr[(set - 1) / 2] + ".png";
        }

    }

    function int2filename(card) {
        return `${process.env.PUBLIC_URL}/images/playingcards/${int2filenameOld(card)}`;
    }

    const numCards = 54;
    const range = [];
    const images = [];
    for (let i = 0; i < numCards; i += 1) {
        range.push(i);
        images.push(int2filename(i));
    }

    const groups = [
        _image => true,
        image => images[image].includes("clubs"),
        image => images[image].includes("diamonds"),
        image => images[image].includes("hearts"),
        image => images[image].includes("spades"),
        image => images[image].includes("joker")
    ];


    const cardSubsetNums = groups.map(group => range.filter(group));
    const cardSubsets = cardSubsetNums.map(subset => subset.map(i => images[i]));

    const cardSubsetLabels = ["All cards", "Clubs", "Diamonds", "Hearts", "Spades", "Jokers"];

    return new CardSet(numCards, images, cardSubsets, cardSubsetLabels, cardSubsetNums);
}


export const gamesets = ["Playing cards"];

export const cardSets = [makePlayingCardsSet()];