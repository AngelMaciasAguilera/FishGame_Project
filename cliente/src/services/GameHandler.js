export const GameHandler = {
    game : null,
    players: null,

    init : (gameToSet) => {
        if(GameHandler.game == null){
            GameHandler.game = gameToSet;
            GameHandler.players = gameToSet.players;
        }
    },

    get_player: (player_id) => {
        return GameHandler.game.players.find((element) => element.id == player_id);
    },

    set_player_direction: (player_id, direction) => {
        console.log("Este es el id del player a setear: ")
        console.log(player_id);
        //To set the player the new direction we must obtain the user index array to directly set the new position to it
        const isCorrectID = (element) => element.id == player_id;
        GameHandler.players[GameHandler.players.findIndex(isCorrectID)].direction = direction;
        console.log("Estas son las posiciones de los players: ");
        console.log(GameHandler.players);
    },

    get_player_inPosition(player_game_ID){
        return GameHandler.game.players.find((element) => element.gameID == player_game_ID);
    }


}