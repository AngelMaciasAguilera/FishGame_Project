import { Player } from "../../player/entities/Player";
import { Bush } from "./Bush";

export interface Element {
    x : number;
    y : number;
    type: 0;
    object: Player | Bush | null; 
}

export interface Board {
    size: number;
    elements: Array<Element>;
}

