import { randomNumber } from "../utils/randomNumber";
import intervals from "./Intervals";

class Key{
    
    private C_MAJOR: Array<string> = [ "C Major",  "C1", "D1", "E1", "F1", "G1", "A1", "B1", "C2", "D2", "E2", "F2", "G2", "A2", "B2", "C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4", "D4", "E4", "F4", "G4", "A4", "B4"];
    private C_MINOR: Array<string> = [ "C Minor",  "C1", "D1", "D#1", "F1", "G1", "G#1", "A#1", "C2", "D2", "D#2", "F2", "G2", "G#2", "A#2", "C3", "D3", "D#3", "F3", "G3", "G#3", "A#3", "C4", "D4", "D#4", "F4", "G4", "G#4", "A#4"];

    public DATABASE: Array<any> = [this.C_MAJOR, this.C_MINOR];
    public index: number = Math.floor(Math.random()* this.DATABASE.length);
    public current: string = this.DATABASE[this.index];
	public justChanged: Boolean;

	
    public change(){

        let newIndex: number = randomNumber(this.DATABASE.length-1)
		
		while (newIndex == this.index)
			newIndex = randomNumber(this.DATABASE.length-1);
		
		this.index = newIndex;
		this.current = this.DATABASE[this.index];
		intervals.updated = false;
		intervals.populate();

		this.justChanged = true;
	}

	public cycle() {
		this.change();
	}
}

const key = new Key();
export default key;
