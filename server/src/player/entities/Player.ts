import { Socket } from "socket.io";

export enum Directions {
    Up = "up", 
    Down = "down",
    Left = "left",
    Right = "right",
    Idle = "idle"
}

export enum PlayerStates {
    No_Connected, Idle, Moving, Hidden, Dead
}

export interface Player {
    id: any;
    x: Number;
    y: Number;
    gameID: String;
    type: "player";
    state: PlayerStates;
    direction: Directions;
    visibility: Boolean;
}


//We use a version of the factory pattern to generate our differents type of players
export const PlayerFactory = {
    //This builds a player object to be saved in the server with its socket to be accessible
    buildPlayerServer: (socket: Socket) : Player => {
        return {
            id: socket,
            x: 0,
            y: 0,
            type: "player",
            gameID: 'player_' + 0,
            state: PlayerStates.Idle,
            direction: Directions.Up,
            visibility: true
        }
    },
    //This builds a player object to be sended to the client with its socket to be unique in the board and in any event with its id the server can recognise them
    buildPlayerClient: (socket: Socket, roomSize: Number) : Player => {
        return {
            id: socket.id,
            type: "player",
            x: 0,
            y: 0,
            gameID: 'player_' + roomSize,
            state: PlayerStates.Idle,
            direction: Directions.Up,
            visibility: true
        }
    }
}