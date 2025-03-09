import { Player } from "../../player/entities/Player";
import { Bush } from "./Bush";

export interface Element {
    type: number | String;
    object: Player | Bush | null; 
}

export interface Board {
    size: number;
    elements: Array<Element>;
}



