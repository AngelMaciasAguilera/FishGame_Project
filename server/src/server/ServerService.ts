import { DefaultEventsMap, Server, Socket } from 'socket.io';
import http from 'http';
import { GameService } from '../game/GameService';
import { AnyTxtRecord } from 'dns';
import { PlayerFactory, Directions } from '../player/entities/Player';
import { Messages } from '../game/entities/Game';

export class ServerService {
    private io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> | null;
    private active : boolean;

    public inputMessage = [
            {
                type: "PLAYER_ROTATES",
                do: this.do_emitPlayerRotation
            },

            {
                type: "PLAYER_MOVES",
                do: this.do_emitPlayerMovement
            }
        ];

    private static instance: ServerService;
    private constructor() {
        this.io = null;
        this.active = false;
    };

    static getInstance(): ServerService {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ServerService();
        return this.instance;
    }

    public init(httpServer: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>) {
        this.io = new Server(httpServer, {
            cors: {
                origin: '*',
                methods: ['GET', 'POST']
            }
        });
        this.active = true;

        this.io.on('connection', (socket) => {
            socket.emit("connectionStatus", { status: true });
            
            const player = PlayerFactory.buildPlayerServer(socket);

            GameService.getInstance().addPlayer(player);
            
            socket.on("message", (data)=>{
                // We obtain the type of the inputMessage the client wants to execute
                const doType = this.inputMessage.find(item => item.type == data.type);
                if (doType !== undefined) {
                    console.log("Este es el type");
                    console.log(doType);
                    doType.do(data.content);
                }
            })

            socket.on('disconnect', () => {
                console.log('Un cliente se ha desconectado:', socket.id);
            });
        });
    }

    public addPlayerToRoom(player : Socket, room: String, roomSize : Number) { 

        // Emits the player ID to the specific player
        player.emit("message" ,{
            type : "PLAYER_ID",
            content: 'player_' + roomSize,
        });

       // Joins the user to the specified room
       player.join(room.toString());
    }

    public sendMessage(room: String |null ,type: String, content: any) {
        if (this.active && this.io!=null) {
            if (room != null) {
                console.log("Añado este content");
                    this.io?.to(room.toString()).emit("message", {
                        type, content
                    })
            }
        }
    }

    public gameStartMessage() {
        //
    }

    public isActive() {
        return this.active;
    }

    private do_emitPlayerRotation(payload: any) {
        console.log("Ha rotado: ");
        console.log(payload);
        GameService.getInstance().addRotationPlayer(payload.gameID, payload.playerID, payload.direction);
        ServerService.getInstance().sendMessage(payload.room, Messages.PLAYER_ROTATES, payload);

    }

    private do_emitPlayerMovement(payload:any){
        GameService.getInstance().movePlayer(payload.playerID, payload.x, payload.y);
    }

}