
const game2socket: { [game: string]: string } = {};

export function addGameCode(gameCode: string, socket: string) {
    game2socket[gameCode] = socket;
}

export function getSocket(gameCode: string) {
    if (gameCode in game2socket && game2socket[gameCode] != null) {
        return game2socket[gameCode];
    } 
}