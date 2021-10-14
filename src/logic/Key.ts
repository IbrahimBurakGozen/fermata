import { randomNumber } from "../utils/randomNumber";
import intervals from "./Intervals";

class Key{
    
	/* Musical keys, stored in Arrays. */
    public C_MAJOR: Array<string> = [ "C Major",  "C1", "D1", "E1", "F1", "G1", "A1", "B1", "C2", "D2", "E2", "F2", "G2", "A2", "B2", "C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4", "D4", "E4", "F4", "G4", "A4", "B4"];
    public C_MINOR: Array<string> = [ "C Minor",  "C1", "D1", "D#1", "F1", "G1", "G#1", "A#1", "C2", "D2", "D#2", "F2", "G2", "G#2", "A#2", "C3", "D3", "D#3", "F3", "G3", "G#3", "A#3", "C4", "D4", "D#4", "F4", "G4", "G#4", "A#4"];

	/** Array of all the keys. */
    public DATABASE: Array<Array<string>> = [this.C_MAJOR, this.C_MINOR];
	/** Number used with key array to select and identify the current key. */
    public index: number = Math.floor(Math.random()* this.DATABASE.length);
	/** The current key, and the string equivalent of keyIndex. */
    public current: any = this.DATABASE[this.index];
	/** Whether or not the key has been just changed. */
	public justChanged: Boolean;

	
    public change(){

        let newIndex: number = randomNumber(this.DATABASE.length-1)
		
		if (newIndex == this.index){
			newIndex = randomNumber(this.DATABASE.length-1);
		}
		
		this.index = newIndex;
		this.current = this.DATABASE[this.index][0];
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
