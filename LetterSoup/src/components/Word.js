export class Word {
    word;
    id;
    complete

    constructor(word, id){
        this.word = word;
        this.id = id;
        this.complete = false;
    }

    setComplete(){
        this.complete = true;
    }

}