 class CardSet {
    constructor(numCards, images, cardSubSets, cardSubSetLabels) {
        this.numCards = numCards;
        this.images = images;
        this.cardSubSets = cardSubSets;
        this.cardSubSetLabels = cardSubSetLabels;
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
    const images = [];
    for (let i = 0; i < numCards; i += 1) {
        images.push(int2filename(i));
    }

    const groups = [
        _filename => true,
        filename => filename.includes("clubs"),
        filename => filename.includes("diamonds"),
        filename => filename.includes("hearts"),
        filename => filename.includes("spades"),
        filename => filename.includes("joker")
    ];

    const cardSubSets = groups.map(group => images.filter(group));

    const cardSubSetLabels = ["All cards", "Clubs", "Diamonds", "Hearts", "Spades", "Jokers"];

    return new CardSet(numCards, images, cardSubSets, cardSubSetLabels);
}


export const gamesets = ["Playing cards"];

export const cardSets = [makePlayingCardsSet()];