class Note{

    public DATABASE: Array<string> = ["C1", "C#1", "D1", "D#1", "E1", "F1", "F#1", "G1", "G#1", "A1", "A#1", "B1", "C2", "C#2", "D2", "D#2", "E2", "F2", "F#2", "G2", "G#2", "A2", "A#2", "B2", "C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3", "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4"];

	/** The very first note that's triggered. */
	public initial: string;
	/** The last Play Note played. */
	public lastRecorded: string;
	/** The second to last Play Note played. */
	public secondToLastRecorded: string;
	/** The last Note played, regardless of whether in Play/Replay Mode **/
	public lastAbsolute: string;
	/** The last Octave Note played. */
	public lastOctave: string;
	/** The last Harmony Note played. */
	public lastHarmony: string;
	
}

const note = new Note()
export default note;