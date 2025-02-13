import { Board } from "../entities/Board.js";
import { GivenID } from "../entities/Player.js";
import { Queue } from "../Queue.js";
import { GameHandler } from "./GameHandler.js";

export class GameService {
    #states = {
        WAITING : 0,
        PLAYING : 1,
        ENDED : 2
    };
    #ui = null;
    #board = null;
    #queue = null;
    #state = null;
    #parallel = null;

    #actionsList = {
        "NEW_PLAYER" : this.do_newPlayer.bind(this),
        "PLAYER_ID" : this.do_saveMyID.bind(this),
        "GAMEREADY" : this.do_gameReady.bind(this),
        "PLAYER_ROTATES" : this.do_playerRotates.bind(this)
    };

    constructor(ui){
        this.#state = this.#states.WAITING;
        this.#board = new Board();
        this.#queue = new Queue();
        this.#parallel = null;
        this.checkScheduler();
        this.#ui = ui;
    }

    checkScheduler() {
        if (!this.#queue.isEmpty()) {
            if (this.#parallel == null) {
                this.#parallel = setInterval(
                    async ()=>{
                        const action = this.#queue.getMessage();
                        if (action != undefined) {  
                            console.log(action);
                            await this.#actionsList[action.type] (action.content);
                        } else {
                            this.stopScheduler();
                        }
                    }
                );
            }
        }
    }

    stopScheduler() {
        clearInterval(this.#parallel);
        this.#parallel = null;
    }

    do (data) {
        this.#queue.addMessage(data);
        this.checkScheduler();
    };

    async do_gameReady(payload){
        //Saving the game object recieved from the server
        GameHandler.init(payload)
        this.#board.build(GameHandler.game.board);
        this.#ui.drawBoard(this.#board.map, GameHandler.players);
    }

    async do_newPlayer(){
        this.#ui.waitPlayers();
    }

    async do_saveMyID(payload){
        GivenID.setID(payload);
        console.log("Ahora el given ID es: ");
        console.log(GivenID.getID());
    }

    async do_playerRotates(payload){
       this.#ui.drawPlayerRotation(payload);
    }

}