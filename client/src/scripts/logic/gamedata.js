//TODO: deal with refreshing the gamedata upon a new host or join

class GameData extends EventTarget {
    constructor() {
        super()

        this.state = {
            setup: false,
            need_name: false
        };
    }
}


export const gamedata = new GameData();