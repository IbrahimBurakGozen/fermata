import Action from "./action";
import Intervals from '../logic/Intervals';
import Note from '../logic/Note';

class Harmony extends Action{

	onPress(): void {
		this.generateNote();
        this.playHarmonyTone()
	}
    
    public playHarmonyTone() {

		let harmonyTone: any;
		let choices: Array<any> = [];
		var i/* :Map<String, String> */ = Intervals.loadout;

			 if (Note.lastAbsolute == i.get("one1")) choices = [i.get("thr1"), i.get("fiv1"), i.get("thr2"), i.get("fiv2")];
		else if (Note.lastAbsolute == i.get("two1")) choices = [i.get("fiv1"), i.get("sev1"), i.get("fiv2")];
		else if (Note.lastAbsolute == i.get("thr1")) choices = [i.get("fiv1"), i.get("one2")];
		else if (Note.lastAbsolute == i.get("for1")) choices = [i.get("fiv1"), i.get("one2"), i.get("two2")];
		else if (Note.lastAbsolute == i.get("fiv1")) choices = [i.get("thr1"), i.get("sev1"), i.get("thr2")];
		else if (Note.lastAbsolute == i.get("six1")) choices = [i.get("one2"), i.get("thr2")];
		else if (Note.lastAbsolute == i.get("sev1")) choices = [i.get("thr1"), i.get("fiv1"), i.get("thr2")];
		else if (Note.lastAbsolute == i.get("one2")) choices = [i.get("fiv1"), i.get("thr2"), i.get("fiv2")];
		else if (Note.lastAbsolute == i.get("two2")) choices = [i.get("fiv1"), i.get("fiv2"), i.get("sev2")];
		else if (Note.lastAbsolute == i.get("thr2")) choices = [i.get("sev1"), i.get("one2"), i.get("fiv2"), i.get("sev2"), i.get("one3")];
		else if (Note.lastAbsolute == i.get("for2")) choices = [i.get("two2"), i.get("fiv2"), i.get("one3")];
		else if (Note.lastAbsolute == i.get("fiv2")) choices = [i.get("thr2"), i.get("sev2"), i.get("thr3")];
		else if (Note.lastAbsolute == i.get("six2")) choices = [i.get("one3"), i.get("thr3")];
		else if (Note.lastAbsolute == i.get("sev2")) choices = [i.get("thr2"), i.get("fiv2"), i.get("thr3")];
		else if (Note.lastAbsolute == i.get("one3")) choices = [i.get("thr2"), i.get("fiv2"), i.get("thr3"), i.get("fiv3")];
		else if (Note.lastAbsolute == i.get("two3")) choices = [i.get("fiv2"), i.get("sev2"), i.get("fiv3")];
		else if (Note.lastAbsolute == i.get("thr3")) choices = [i.get("sev2"), i.get("one3"), i.get("fiv3"), i.get("sev3"), i.get("one4")];
		else if (Note.lastAbsolute == i.get("for3")) choices = [i.get("two3"), i.get("fiv3"), i.get("one4")];
		else if (Note.lastAbsolute == i.get("fiv3")) choices = [i.get("thr3"), i.get("sev3"), i.get("one4")];
		else if (Note.lastAbsolute == i.get("six3")) choices = [i.get("thr3"), i.get("one4")];
		else if (Note.lastAbsolute == i.get("sev3")) choices = [i.get("thr3"), i.get("fiv3")];
		else if (Note.lastAbsolute == i.get("one4")) choices = [i.get("thr3"), i.get("fiv3")];

		harmonyTone = Math.floor(Math.random() * choices.length);

		let harmony: any;	
		//harmony = Button.MIDIplay(harmonyTone);
		
		Note.lastHarmony = harmonyTone;
	}

	public toString(): string {
        return "Harmony";
    }
}

const harmony = new Harmony
export default harmony;