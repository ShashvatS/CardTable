import { get_client_id } from "./my_id";
import { MersenneTwister19937, createEntropy } from "random-js";

//TODO: deal with refreshing the gamedata upon a new host or join
class GameData extends EventTarget {
    constructor() {
        super()

        this.started = false;

        this.cardSet = null;

        let seed = createEntropy();
        const mt = MersenneTwister19937.seedWithArray(seed);

        this.state = {
            game_code: null,
            message_counter: 0,
            client2name: {},
            name2client: {},
            piles: [],
            random: {
                seed: seed,
                mt: mt,
                useCount: mt.getUseCount()
            }
        };

        this.chatMessages = [];

        this.copyState = state => {
            this.state = state;
            this.started = true;
            this.chatMessages = [];
            this.cardSet = null;


            let mt = MersenneTwister19937.seedWithArray(this.state.random.seed);
            mt = mt.discard(this.state.random.useCount);
            this.state.random.mt = mt;
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

        this.update_random = () => {
            this.state.random.useCount = this.state.random.mt.getUseCount();
        }
    }
}

export let gamedata = new GameData();

export function start_game(game_code, usePrevState) {
    let data = localStorage.getItem("game");
    if (usePrevState && data != null) {
        const state = JSON.parse(data);
        gamedata.copyState(state);

        gamedata.started = true;
        gamedata.state.game_code = game_code;
        gamedata.dispatchEvent(new Event("startup-event"));

        return;
    }
    //deal with event handlers
    if (gamedata.started) {
        let seed = createEntropy();
        const mt = MersenneTwister19937.seedWithArray(seed);

        gamedata.copyState({
            message_counter: 0,
            client2name: {},
            name2client: {},
            piles: [],
            random: {
                seed: seed,
                mt: mt,
                useCount: mt.getUseCount()
            }
        });
    }

    gamedata.state.game_code = game_code;
    gamedata.started = true;

    gamedata.dispatchEvent(new Event("startup-event"));
}