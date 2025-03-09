import { Board, Element } from "./entities/Board";

export class BoardBuilder {
    private board: Board;

    constructor() {
        this.board = {
            size: 10,
            elements: [],
        }

        const map: Array<number[]> = [
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 5, 0, 0, 0],
            [0, 5, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 5, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 5, 0],
            [0, 0, 5, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 5, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1]
        ];

       //We loop the map to set the necessary elements.
       for(let i = 0; i < this.board.size; i++){
            //We only set the posisitions that aren't 0, this is made to not send an array of hundreds of elements, so the client
            //Will read the empty positions as the null objects, and we only have to worry about the filled positions in the server.
            for(let j = 0; j < this.board.size; j++){
                if(map[i][j] == 5){
                    this.board.elements.push(
                        {
                            type: "bush",
                            object: {
                                x: i,
                                y: j,
                            } 
                        }
                    );
                }
            }
       }

    }

    public getBoard(): Board {
        return this.board;
    }

}