import key from '../logic/Key';
import note from '../logic/Note';
import mode  from '../logic/Mode';
import intervals from '../logic/Intervals';
const Sound = require('node-aplay');

abstract class Action {

	public playsNote: boolean = false;
	public noteName: string = 'n/a';

	public type: string = "";
    private static lastSoundtype: string;

	abstract onPress():void;
	abstract toString():string;

	/////////////////////////////////////////////////////////////////////////////////////////////////////////
	// MUSIC FUNCTIONS //////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////

	/** Play a note! Takes in an array of classes, and will pick one randomly. */
    protected async play(options: Array<string>){
		let noteName = this.noteAdjustments(options);
		console.log("This is the note that is going to be played => ", noteName);
		
		
		let note = new Sound(`/home/ubuntu/fermata/src/actions/sounds/${noteName}.wav`)
		await note.play();
		note.secondToLastRecorded = note.lastRecorded;
		note.lastRecorded = noteName;
		note.lastAbsolute = note.lastRecorded;
	}
	
	protected playChord(){

		// DETERMINE CHORD TONES
		let chordTones: any = mode.current.chords[Math.floor(Math.random() * mode.current.chords.length)];
		console.log(`These are the chord tones: ${intervals.loadout.get(chordTones)}`)	

		console.log(intervals.loadout.get(chordTones[0]));
		new Sound(`/home/ubuntu/fermata/src/actions/sounds/${intervals.loadout.get(chordTones[0])}.wav`).play();	
		new Sound(`/home/ubuntu/fermata/src/actions/sounds/${intervals.loadout.get(chordTones[1])}.wav`).play();
		new Sound(`/home/ubuntu/fermata/src/actions/sounds/${intervals.loadout.get(chordTones[2])}.wav`).play();	


		if (chordTones.length > 3 && intervals.loadout.get(chordTones[3]) != null) {
			new Sound(`/home/ubuntu/fermata/src/actions/sounds/${intervals.loadout.get(chordTones[3])}.wav`).play();
		}
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////
	// MODE FUNCTIONS //////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////


	/** Uses the option sets of the current mode to choose which note to generate. */
    protected generateNote(): void{

        console.log('starting GenerateNote')
        let played: boolean = false;
		
		
		let optionSets = mode.current.logic;
		//console.log(intervals.loadout)

		intervals.DATABASE.forEach((databaseElement,index) =>{
			if(note.lastRecorded == intervals.loadout.get(databaseElement)){
				this.play(optionSets[index])
				//console.log("generated notes=",optionSets[index]);
			}
		})
        
		if (played = false){ //edge case 
			this.play(optionSets[22]);
			console.log('using generate note edge case')
		};
    }

	//Edge cases and preventing chromatism hell
    protected noteAdjustments(options: Array<string>):string {
			console.log('adjusting notes');
			let newNote: any = "";
			let random: number = 0;
			
			// NOTE PREVENTIONS
			random = Math.floor(Math.random()* options.length);
			newNote = intervals.loadout.get(options[random]);
			
			// Halve Probability of Trills and Repeats
			if (newNote == note.secondToLastRecorded || newNote == note.lastAbsolute){
				console.log("halving probability of Trills and Repeats")
				random = Math.random()* options.length;
				newNote = intervals.loadout.get(options[random]);
			}
			
			let g = 0;		
			while (g < 100 && (note == null
				|| (newNote == note.lastHarmony && Action.lastSoundtype == "Harmony")
				|| (newNote == note.lastOctave && Action.lastSoundtype == "Octave")
				//|| (type == "Octave" && (note == Intervals.loadout.get("for1") || note == Intervals.loadout.get("for2") || note == Intervals.loadout.get("for3")))
				))
			{
				random = Math.random() * options.length - 1;
				newNote = intervals.loadout.get(options[random]);
				g++;
			}				
			
			// Prevent certain tensions from triggering on record mode key changes
		 if (key.justChanged && mode.current != mode.MIXOLYDIAN
			&& (newNote == intervals.loadout.get("two1") ||
				newNote == intervals.loadout.get("for1") ||
				newNote == intervals.loadout.get("six1") ||
				newNote == intervals.loadout.get("for2") ||
				newNote == intervals.loadout.get("six2") ||
				newNote == intervals.loadout.get("for3") ||
				newNote == intervals.loadout.get("six3")) ) {

			for (let desc in intervals.loadout.keys()) {
				if (newNote == intervals.loadout.get(desc)) {
					for (let j = 0; j < intervals.DATABASE.length - 1; j++) {
						if (intervals.loadout.get(desc) == intervals.DATABASE[j]) {
							// change new note to be +/- 1 interval if the key just changed.
							newNote = intervals.loadout.get(intervals.DATABASE[j + Math.random() < 0.5 ? -1 : 1]);
							break;
						}
					}
				}
			}
			key.justChanged = false;
		}
		console.log("adjusted note => ", newNote);
		return newNote;
		}
		
		
}

export default Action;