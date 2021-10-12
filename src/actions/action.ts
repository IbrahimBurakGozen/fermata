import Key from '../logic/Key';
import Note from '../logic/Note';
import mode  from '../logic/Mode';
import { WebMidi } from 'webmidi';
import intervals from '../logic/Intervals';

abstract class Action {

	//WebMidi = WebMidi.enable().catch((err: any) => console.log("Error: Button property WebMidi, \n" + err));
	
	//public static MIDIplay = (note: any) => WebMidi.getOutputByName("toKeyscape").channels[1].playNote(note, {duration: 10000});
	public playsNote: Boolean = false;
	public noteName: String = 'n/a';

	public type: String = "";
    private static lastSoundtype: String;

	abstract onPress():void;
	abstract toString():string;

    protected playNote(){
		this.generateNote();
    }

    protected play(options: Array<String>){
		let noteName = this.noteAdjustments(options);
		console.log(noteName);
		
		//Button.MIDIplay(noteName);
		//playJZZMIDI(noteName)
	}
	
	protected playChord(){
		let chordTones: any = mode.current.chords[Math.floor(Math.random() * mode.current.chords.length)];
		console.log(`These are the chord tones: ${chordTones}`)
		//Button.MIDIplay(Intervals.loadout.get(chordTones))
		console.log(chordTones);
		

		//playJZZMIDI(Intervals.loadout.get(chordTones[0]));
		//playJZZMIDI(Intervals.loadout.get(chordTones[1]));
		//playJZZMIDI(Intervals.loadout.get(chordTones[2]));
		// If the chord is a seventh chord, push the 4th chord tone.
		//if (chordTones.length > 3 && Intervals.loadout.get(chordTones[3]) != null) {


			//playJZZMIDI(Intervals.loadout.get(chordTones[3]));
		//}
			


	//TODO

	}

    protected generateNote(){

        console.log('starting GenerateNote')
        let played: Boolean = false;
        let optionSets: Array<Array<String>>;

		optionSets = mode.current.logic;
		console.log(intervals.loadout)
        for (let j = 0; j < intervals.DATABASE.length; j++) {
            if (Note.lastRecorded == intervals.loadout.get(intervals.DATABASE[j])){
				this.play(optionSets[j]);
				console.log('generated note, playing note');
                played = true;
            }
        }
		if (played = false){ 
			this.play(optionSets[22]);
			console.log('using generate note edge case')
		}; //edge case 
    }

	//Edge cases and preventing chromatism hell
    protected noteAdjustments(options: Array<String>):String {
			console.log('adjusting notes');
			let note: any = "";
			let random: number = 0;
			
			// NOTE PREVENTIONS
			random = Math.floor(Math.random()* options.length);
			note = intervals.loadout.get(options[random]);
			
			// Halve Probability of Trills and Repeats
			if (note == Note.secondToLastRecorded || note == Note.lastAbsolute){
				console.log("halvin probability of Trills and Repeats")
				random = Math.random()* options.length;
				note = intervals.loadout.get(options[random]);
			}
			
			let g = 0;		
			while (g < 100 && (note == null
				|| (note == Note.lastHarmony && Action.lastSoundtype == "Harmony")
				|| (note == Note.lastOctave && Action.lastSoundtype == "Octave")
				//|| (type == "Octave" && (note == Intervals.loadout.get("for1") || note == Intervals.loadout.get("for2") || note == Intervals.loadout.get("for3")))
				))
			{
				random = Math.random() * options.length - 1;
				note = intervals.loadout.get(options[random]);
				g++;
			}				
			
			// Prevent certain tensions from triggering on record mode key changes
		 if (Key.justChanged && mode.current != mode.MIXOLYDIAN
			&& (note == intervals.loadout.get("two1") ||
				note == intervals.loadout.get("for1") ||
				note == intervals.loadout.get("six1") ||
				note == intervals.loadout.get("for2") ||
				note == intervals.loadout.get("six2") ||
				note == intervals.loadout.get("for3") ||
				note == intervals.loadout.get("six3")) ) {

			for (let desc in intervals.loadout.keys()) {
				if (note == intervals.loadout.get(desc)) {
					for (let j = 0; j < intervals.DATABASE.length - 1; j++) {
						if (intervals.loadout.get(desc) == intervals.DATABASE[j]) {
							// change new note to be +/- 1 interval if the key just changed.
							note = intervals.loadout.get(intervals.DATABASE[j + Math.random() < 0.5 ? -1 : 1]);
							break;
						}
					}
				}
			}
			Key.justChanged = false;
		}
		return note;
		}
		
		
}

export default Action;


/* export const soundplayer = require('sound-play');
export const JZZ = require('jzz');
require("jzz-midi-smf")(JZZ);
export async function playJZZMIDI(note: any) {
    var midi = await JZZ();
    var port = await midi.openMidiOut();
    await port.noteOn(0, note, 127);
    await port.wait(2000);
    await port.noteOff(0, note);
    await port.close();
    console.log('played:', note);
} */


//export let MIDIplay = (note: any) => WebMidi.getOutputByName("toKeyscape").channels[1].playNote(note, {duration: 10000});



// static sounds =     ["Small", "Octave", "Harmony", "Chord", "Transpose"];
//     static weights =    [ 88.5  ,  3.5	 ,  3.5		,  2	 ,  0.5]; 
//     static playsNote: boolean;