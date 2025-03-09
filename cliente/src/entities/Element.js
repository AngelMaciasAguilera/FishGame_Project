export class Element {
    #type = null;
    #object = null;

    constructor(type, object) {
        this.#type = type;
        this.#object = object;
    }

    get type() {
        return this.#type;
    }

    set type(newType) {
        this.#type = newType;
    }

    get object() {
        return this.#object;
    }
    
    set object(newObject) {
        this.#object = newObject;
    }

}