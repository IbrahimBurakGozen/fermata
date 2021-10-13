import Action from "./action";
import Key from "../logic/Key";
import mode  from "../logic/Mode";

class Transpose extends Action{
    onPress(): void {
        console.log('changing mode')
        mode.change();
        console.log('changing key')
        Key.change();
        console.log('playing transposition chord')
        this.playChord();
    }

    public toString(): string {
        return "Transpose";
    }
}

const transpose = new Transpose();
export default transpose;
