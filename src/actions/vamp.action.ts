import Action from "./action";

class Vamp extends Action {

    onPress(): void {
        this.playChord();
    }

    public toString(): string {
        return "Vamp";
    }
}

const vamp = new Vamp();
export default vamp;