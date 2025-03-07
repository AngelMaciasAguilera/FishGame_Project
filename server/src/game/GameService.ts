import { Socket } from "socket.io";
import { Directions, Player, PlayerStates } from "../player/entities/Player";
import { Room } from "../room/entities/Room";
import { RoomService } from "../room/RoomService";
import { Game, GameFactory, GameStates, Messages } from "./entities/Game";
import { BoardBuilder } from "./BoardBuilder";
import { ServerService } from "../server/ServerService"
export class GameService {
    private games: Game[];

    private static instance: GameService;
    private constructor() {
        this.games = [];
    };

    static getInstance(): GameService {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new GameService();
        return this.instance;
    }

    public addPlayer(player: Player): boolean {
        const room: Room = RoomService.getInstance().addPlayer(player);
        ServerService.getInstance().sendMessage(room.name, Messages.NEW_PLAYER, "NEW_PLAYER");

        //This returns a JSON which contains the type of the message and the id of the new player, the id will be a number like 1 or 2 to be more accessible from the client

        if (room.players.length == 1) {
            const game = GameFactory.buildServerGame(room);
            room.game = game;
            this.games.push(game);
        }

        if (room.occupied) {
            if (room.game) {
                //We loop our array of players and we give a random position in the board to each player
                let availablePositions = [[0,0],[0,9],[9,0],[9,9]];
                for (const element of room.players) {
                    let randomPosition = Math.floor(Math.random() * availablePositions.length);
                    element.x = availablePositions[randomPosition][0];
                    element.y = availablePositions[randomPosition][1];
                    availablePositions.splice(randomPosition, 1);                     
                    room.game.board.elements.forEach(item => {
                        if(item.type == 1){
                            item.object = element
                        }
                    });
                }


                room.game.state = GameStates.PLAYING;
                if (ServerService.getInstance().isActive()) {
                    /*
                        We send the room because it has everything we want, it has the players with its name its state,
                        and on the other hand it has the  game which has the board, so to sum up we are sending the players, the board, the info of the room, and also the info of the game, all we need in the client-side
                    */
                    console.log("Tablero para ser enviado: ");
                    console.log(room.game.board);
                    const gameClient = GameFactory.buildClientGame(room);
                    ServerService.getInstance().sendMessage(room.name, Messages.GAMEREADY, gameClient);
                }
            }
            return true;
        }

        return false;
    }

    public movePlayer(gameID : String, positionX : number, positionY : number){
        const game = this.games.find((item) => item.id == gameID);

        if((positionX >= 0 && positionX <= 9) && (positionY >= 0 && positionY <= 9)){
            const validTile = game?.players?.find((item) => item.x == positionX && item.y  == positionY);
            if(validTile == undefined){
                console.log("vale player muevete");
            }
        }

    }

}
