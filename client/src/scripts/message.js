import { gamedata } from "./logic/gamedata";
import { get_client_id } from "./logic/my_id";

function set_name(data) {
    const client = data.client;
    const name = data.name;

    if (name == null || name === "" || client == null) return;
    if (gamedata.state.client2name[client] != null) return;

    //only if client does not already have name and name is not already taken
    else if (gamedata.state.name2client[name] == null) {
        gamedata.state.name2client[name] = client;
        gamedata.state.client2name[client] = name;

        gamedata.dispatchEvent(new Event("startup-event"));
    }
}

function handleChatMessage(data) {
    if (data.author == null || data.message == null || data.message === "") return;
    if (data.author === get_client_id()) {
        data.is_author = true;
    } else {
        data.is_author = false;
    }

    data.author = gamedata.state.client2name[data.author];

    if (data.author == null) return;

    gamedata.chatMessages.push(data);
    gamedata.dispatchEvent(new Event("chat-message"));
}

function handleNewPile(data) {
    if (data == null || data.name == null) return;
    if (gamedata.pile_exists(data.name)) return;

    if (data.name === "" || data.cards == null) return;

    gamedata.state.piles.push(data);
    gamedata.dispatchEvent(new Event("new-pile"));
}

function handleShuffle(data) {
    if (data == null || data.pile == null) return;
    let event = new Event("shuffle");
    event.pile = data.pile;
    gamedata.dispatchEvent(event);
}

function handleMoveCard(data) {
    if (data == null) return;
    const from = data.pileFrom;
    const to = data.pileTo;
    const card = data.card;

    if (from == null || to == null || card == null) return;

    const item = gamedata.state.piles[from].cards[card];
    gamedata.state.piles[to].cards.push(item);
    gamedata.state.piles[from].cards.splice(card, 1);

    gamedata.dispatchEvent(new Event("new-pile"));
}

function handle_message_main(data) {
    if (data == null) return;

    if (data.set_name != null) {
        set_name(data.set_name);
    }

    if (data.chatMessage) {
        handleChatMessage(data.chatMessage);
    }

    if (data.makePile) {
        handleNewPile(data.makePile);
    }

    if (data.shuffle) {
        handleShuffle(data.shuffle);
    }

    if (data.moveCard) {
        handleMoveCard(data.moveCard);
    }

    localStorage.setItem("game", JSON.stringify(gamedata.state));
}

const message_storage = {};

//this deals with receiving messages out of order
export function handle_message(data) {
    //might modify data, make a copy of it because this data is also sent to other users
    data = JSON.parse(JSON.stringify(data));
    if (data == null) return;

    //specially handle init because inits are not send to everyone
    if (data.init != null) {
        //storing messages in message_storage and deleting them later on
        //deep copy to be safe
        gamedata.copyState(JSON.parse(JSON.stringify(data.init)));
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