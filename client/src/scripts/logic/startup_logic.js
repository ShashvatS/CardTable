import Cookie from "js-cookie";

export function startup() {
    const clientid = Cookie.get("clientid");
    console.log(clientid);


}