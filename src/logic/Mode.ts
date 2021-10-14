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

	/** Array of all the modes. */
	public  DATABASE: Array<ModeDef> = [this.IONIAN, this.DORIAN, this.LYDIAN, this.MIXOLYDIAN, this.AEOLIAN];
	/** Number used with mode array to select and identify the current mode. */
	public  index: number = 0;
	/** The current mode, and the string equivalent of modeIndex. */
	public  current: ModeDef;
	/** The previous mode. */
	public  previous: ModeDef;


	public change(modeIndex = -1){

		if (modeIndex == -1){
		
			let newIndex = randomNumber(this.DATABASE.length-1);

			// Halve Probability of Mixolydian
			if (newIndex == 3) newIndex = randomNumber(this.DATABASE.length-1);

			// dit moet gefixt worden - infinite loop
			// while (newIndex == this.index){
			// 	newIndex = randomNumber(this.DATABASE.length-1);
			// 	this.index = newIndex;
			// 	console.log("in the while loop");
				
			// }
			this.index = newIndex;
		} else {
			this.index = modeIndex;
		}
		this.init();
	}

	public init(){

		//Hier gebeuren rare dingen
		this.previous = this.current;
		this.current = this.DATABASE[this.index];
		intervals.updated = false;
		intervals.populate();
	}
}

const mode = new Mode();
export default mode;


