export class Letter {
    letter;
    id;
    selected;
    color;
    locked;

    constructor(letter, id, color){
        this.letter = letter;
        this.id = id;
        this.color = color;
        this.selected = false;
        this.locked = false;
    }

    toggleSelect(){
        this.selected = !this.selected;
    }

    setColor(color){
        this.color = color;
    }

    getColor(){
        return this.color;
    }

    lock(){
        this.locked = true;
    }

}