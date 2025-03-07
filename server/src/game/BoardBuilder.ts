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

        for (let i = 0; i < this.board.size; i++)
            for (let j = 0; j < this.board.size; j++) {
                const a: Element = {
                    type: map[i][j],
                    object: null,
                };
                
                if (map[i][j] == 5) {
                    a.object = {
                        type: "bush",
                        x: i,
                        y: j,
                    }

                } 
                this.board.elements.push(a);

            }

    }

    public getBoard(): Board {
        return this.board;
    }

}