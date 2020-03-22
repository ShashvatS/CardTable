import Cookie from "js-cookie";

let socket_id = null;
let client_id = null;

export const get_client_id = () => {
    if (client_id == null) client_id = Cookie.get("clientid");
    return client_id;
}

export const get_socket_id = () => {
    return socket_id;
}

export const set_socket_id = socket => {
    socket_id = socket;
}