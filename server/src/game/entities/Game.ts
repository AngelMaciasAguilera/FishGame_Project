import { Player } from "../../player/entities/Player";
import { Room } from "../../room/entities/Room";
import { BoardBuilder } from "../BoardBuilder";
import { Board } from "./Board";

export enum GameStates {
    WAITING, PLAYING
}

export enum Messages {
    NEW_PLAYER = "NEW_PLAYER",
    GAMEREADY = "GAMEREADY",
    PLAYER_ROTATES = "PLAYER_ROTATES",
    PLAYER_MOVES = "PLAYER_MOVES"
}



export interface Game {
    id: String,
    state: GameStates,
    room: Room | String,
    board: Board
    players?: Array<Player>
}


//We use a version of the factory pattern to generate our differents type of game
export const GameFactory = {
    generateRandomGameName: (size: Number) => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
    //This builds a game object to be saved in the server with its socket to be accessible
    buildServerGame: (room: Room): Game => {
        return {
            id: "game" + GameFactory.generateRandomGameName(128),
            state: GameStates.WAITING,
            room: room,
            board: new BoardBuilder().getBoard()
        }
    },
    //This builds a game object to be sended to the client with its socket to be unique in the board and in any event with its id the server can recognise them
    buildClientGame: (room: Room): Game => {
        let idToSet: String = "";
        
        idToSet =  room.game === null ? idToSet = "game" + GameFactory.generateRandomGameName(128) : room.game.id;

        return {
            id: idToSet,
            state: GameStates.WAITING,
            room: room.name,
            board: new BoardBuilder().getBoard(),
            players : room.players
        }
    }
}
