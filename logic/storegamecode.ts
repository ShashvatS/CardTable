
function randomString(length: number): string {
    var str: string = '';
    var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (var i = length; i > 0; --i) str += chars[Math.floor(Math.random() * chars.length)];
    return str;
}

const game2socket: { [game: string]: string } = {};

/**
 * creates a game code given socket id and also stores it */
export function newGameCode(socket_id: string): string {
    const gameCode = randomString(10);
    game2socket[gameCode] = socket_id;
    return gameCode;
}

export function getHostSocket(game: string): string {
    return game2socket[game];
}