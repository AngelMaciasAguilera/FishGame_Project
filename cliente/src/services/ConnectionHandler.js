import { io } from "../../node_modules/socket.io-client/dist/socket.io.esm.min.js";
import { GivenID } from "../entities/Player.js";
import { GameHandler } from "./GameHandler.js";
import { GameService } from "./GameService.js";

export const ConnectionHandler = {
    connected: false,
    socket: null,
    url: null,
    controller: null,
    init: (url, controller, onConnectedCallBack, onDisconnectedCallBack) => {
        ConnectionHandler.controller = controller;
        //We set the socket of the ConnectionHandler 
        ConnectionHandler.socket = io(url);
        let { socket } = ConnectionHandler; 

        socket.on("connect", (data) => {
            socket.on("connectionStatus", (data) => {
                ConnectionHandler.connected = true;
                onConnectedCallBack();
            });

            socket.on("message", (payload) => {
                console.log("El payload del client es este: ");
                console.log(payload);
                ConnectionHandler.controller.actionController(payload);
            })

            socket.on("disconnect", () => {
                ConnectionHandler.connected = false;
                onDisconnectedCallBack();
            });
        })
    },

    sendPlayerRotates : ( room, direction, playerID ) => {
        ConnectionHandler.socket.emit("message", {
            type: "PLAYER_ROTATES",
            content: {
                gameID : GameHandler.game.id,
                room: room,
                direction: direction,
                playerID : playerID,
                playerBoardId: GivenID.getID()
            }
        });
    },

    sendPlayerMovement : (game, playerBoardId, positionX, positionY) => {
        ConnectionHandler.socket.emit("message", {
            type: "PLAYER_MOVES",
            content: {
                game : game, 
                playerBoardId : playerBoardId, 
                positionX : positionX,
                positionY : positionY
            }
        });
    }

}