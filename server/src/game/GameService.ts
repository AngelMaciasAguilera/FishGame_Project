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

                    // We insert the player configurated in the elements array of the board property of the game
                    // I know this is not very efficient in terms, and maybe it's not a good practice, but 
                    // it's to make it through; in post versions we can improve it so it doesn't bothers me.
                    room.game.board.elements.push({
                        type: "player",
                        object: element
                    }); 
                    // We insert the players in the game that is what we send to the client
                    room.game.players?.push(element);
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


    public addRotationPlayer(gameID : String, playerID : String, direction : String ){
        this.games.forEach(game => {
            //Setting the new direction in the server
            // First we find the game indicated in the payload
            console.log("Id del primer juego");
            console.log(game.id);

            console.log("Id del juego enviado");
            console.log(gameID);

            if(game.id == gameID){
                console.log("Llega ");
                console.log(game);
                game.players?.forEach(item => {
                    // Now we find the player that has rotated
                    // Why id id? because the first id is the socket and the second id is the id associated to the socket of the client that is a string
                    console.log(item.id.id);
                    if(item.id == playerID){
                        console.log("Direction setted");
                        // And now we set him the new direction using the readDirectionSended that will translate the string sended to us to an object of Directions
                        item.direction = this.readDirectionSended(direction);
                    }
                });
            }
        });
        
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

    private readDirectionSended(direction : String){
        switch (direction) {
            case "up":
                return Directions.Up
                break;
            
            case "down":
                return Directions.Down
                break;


            case "left":
                return Directions.Left
                break;   


            case "right":
                return Directions.Right
                break;

            default:
                return Directions.Idle;
        }
    }

}
