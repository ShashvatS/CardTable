import { get_client_id } from "./my_id";

//TODO: deal with refreshing the gamedata upon a new host or join
class GameData extends EventTarget {
    constructor() {
        super()

        this.started = false;

        this.cardSet = null;

        this.state = {
            game_code: null,
            message_counter: 0,
            client2name: {},
            name2client: {},
            piles: []
        };

        this.chatMessages = [];

        this.copyState = state => {
            this.state = state;
            this.started = true;
            this.chatMessages = [];
            this.cardSet = null;
        };

        this.my_name = () => {
            return this.state.client2name[get_client_id()];
        }

        this.need_name = () => {
            if (this.my_name() == null) return true;
            return false;
        }

        this.pile_exists = (pileName) => {
            for (let i = 0; i < this.state.piles.length; i += 1) {
                if (this.state.piles[i].name === pileName) {
                    return true;
                }
            }

            return false;
        }
    }
}

export let gamedata = new GameData();

export function start_game(game_code) {
    //deal with event handlers
    if (gamedata.started) {
        gamedata.copyState({
            message_counter: 0,
            client2name: {},
            name2client: {},
            piles: []
        });
    }

    gamedata.state.game_code = game_code;
    gamedata.started = true;

    gamedata.dispatchEvent(new Event("startup-event"));
}