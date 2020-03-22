import { gamedata } from "./logic/gamedata";

function set_name(data) {
    const client = data.client;
    const name = data.name;

    if (name == null || client == null) return;
    if (gamedata.state.client2name[client] != null) return;

    //only if client does not already have name and name is not already taken
    else if (gamedata.state.name2client[name] == null) {
        gamedata.state.name2client[name] = client;
        gamedata.state.client2name[client] = name;

        gamedata.dispatchEvent(new Event("startup-event"));
    }
}

export function handle_message(data) {
    if (data == null) return;

    if (data.init != null) {
        gamedata.state = data.init;
        gamedata.started = true;
    } 

    if (data.set_name != null) {
        set_name(data.set_name);
    }
}