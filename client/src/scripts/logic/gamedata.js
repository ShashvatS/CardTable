import { get_client_id } from "./my_id";
import { MersenneTwister19937, createEntropy } from "random-js";

//TODO: deal with refreshing the gamedata upon a new host or join
class GameData extends EventTarget {
    constructor() {
        super()

        this.started = false;

        this.cardSet = null;

        let seed = createEntropy();
        const mt = new MersenneTwister19937(seed);

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
            console.log(state);

            this.state = state;
            this.started = true;
            this.chatMessages = [];
            this.cardSet = null;


            const mt = new MersenneTwister19937(this.state.random.seed);
            mt.discard(this.state.random.useCount);
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

export function start_game(game_code) {
    //deal with event handlers
    if (gamedata.started) {
        let seed = createEntropy();
        const mt = new MersenneTwister19937(seed);

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