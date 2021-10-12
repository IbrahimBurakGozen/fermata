import { AEOLIAN, LYDIAN, MIXOLYDIAN } from './../database/mode-def.database';
import { DORIAN, IONIAN } from "../database/mode-def.database";
import intervals from "./Intervals";
import { ModeDef } from '../interface/mode.interface';
import { randomNumber } from '../utils/randomNumber';

class Mode {

    // Modes. Ionian in Major is 3 Octaves, Aeolian in Minor. The rest are 2 octaves.
	public IONIAN = IONIAN;
	public DORIAN = DORIAN;
	public LYDIAN = LYDIAN;
	public MIXOLYDIAN = MIXOLYDIAN;
    public AEOLIAN = AEOLIAN;

	public  DATABASE: Array<ModeDef> = [this.IONIAN, this.DORIAN, this.LYDIAN, this.MIXOLYDIAN, this.AEOLIAN];
	public  index: number = 0;
	public  current: ModeDef;
	public  previous: ModeDef;


	public change(modeIndex = -1){

		if (modeIndex == -1){
		
			let newIndex = randomNumber(this.DATABASE.length-1);

			// Halve Probability of Mixolydian
			if (newIndex == 3) newIndex = randomNumber(this.DATABASE.length-1);

			while (newIndex == this.index){
				newIndex = randomNumber(this.DATABASE.length-1);
				this.index = newIndex;
			}
			this.index = newIndex;
		} else {
			this.index = modeIndex;
		}
		this.init();
	}

	public init(){

		//Hier gebeuren rare dingen
		this.previous = this.current;
		console.log(`Previous mode: ${this.previous}`);

		this.current = this.DATABASE[this.index];
		console.log(`New mode: ${this.current}`);

		intervals.updated = false;
		console.log(`Intervals updated: ${intervals.updated}`);
		intervals.populate();
	}
}

const mode = new Mode();
export default mode;


