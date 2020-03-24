import { get_client_id } from "./my_id";

//TODO: deal with refreshing the gamedata upon a new host or join

class GameData extends EventTarget {
    constructor() {
        super()

        this.started = false;

        this.state = {
            message_counter: 0,
            client2name: {},
            name2client: {}
        };

        this.chatMessages = [];

        this.copyState = state => {
            this.state = state;
            this.started = true;
            this.chatMessages = [];
        };

        this.need_name = () => {
            const client = get_client_id();
            if (this.state.client2name[client] == null) return true;
            return false;
        }
    }
}

export let gamedata = new GameData();

export function start_game() {
    //deal with event handlers
    if (gamedata.started) {
        // gamedata = new GameData();
        gamedata.copyState({
            message_counter: 0,
            client2name: {},
            name2client: {}
        });
    }

    gamedata.started = true;

    gamedata.dispatchEvent(new Event("startup-event"));
}