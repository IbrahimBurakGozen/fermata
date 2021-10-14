import Action from "./action";
import Key from "../logic/Key";
import mode  from "../logic/Mode";

class Transpose extends Action{
    onPress(): void {
        mode.change();
        console.log('changing key in transpose');
        
        Key.change();
        this.playChord();
    }

    public toString(): string {
        return "Transpose";
    }
}

const transpose = new Transpose();
export default transpose;
