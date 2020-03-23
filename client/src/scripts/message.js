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

function handle_message_main(data) {
    if (data == null) return;

    if (data.set_name != null) {
        set_name(data.set_name);
    }
}

const message_storage = {};

//this deals with receiving messages out of order
export function handle_message(data) {
    if (data == null) return;

    //specially handle init because inits are not send to everyone
    if (data.init != null) {
        gamedata.state = data.init;
        gamedata.started = true;
    }
    
    if (data.message_counter == null) return;
    message_storage[data.message_counter] = data;

    while (true) {
        const most_recent = message_storage[gamedata.state.message_counter];

        if (most_recent == null) break;

        handle_message_main(most_recent);

        delete message_storage[gamedata.state.message_counter];
        gamedata.state.message_counter += 1;
    }

}