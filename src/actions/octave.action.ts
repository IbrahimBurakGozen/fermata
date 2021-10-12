import Action from "./action";
import note from "../logic/Note";
const Sound = require('node-aplay')


class Octave extends Action{

    onPress(): void {
        this.generateNote();
        this.playOctave();
    }

     public playOctave(){
        let octaveTone:string = "";
        let octaveDownorUp: Array<number> = [-12, 12]

        for (let i = 0; i < note.DATABASE.length; i++) {
            if (note.lastAbsolute == note.DATABASE[i]) {
                console.log('playing octave tone')
				while (octaveTone == "" || octaveTone == null) octaveTone = note.DATABASE[i + octaveDownorUp[Math.floor(Math.random() * octaveDownorUp.length)]];
			}
        }
	//new Sound(`/home/ubuntu/fermata/src/actions/sounds/${octaveTone}.wav`).play();
    console.log("Playing octave note:", octaveTone);
    
        note.lastOctave = octaveTone;
    }   

    public toString(): string {
        return "Octave";
    }
}

const octave = new Octave();
export default octave;
