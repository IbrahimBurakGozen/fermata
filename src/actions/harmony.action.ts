import Action from "./action";
import Intervals from '../logic/Intervals';
import Note from '../logic/Note';
const Sound = require('node-aplay');

class Harmony extends Action{

	onPress(): void {
		this.generateNote();
        this.playHarmonyTone()
	}
    
    public async playHarmonyTone() {

		let harmonyTone: any;
		let choices: Array<any> = [];
		var i/* :Map<String, String> */ = Intervals.loadout;

		switch (Note.lastAbsolute) {
			case i.get("one1"):
				choices = [i.get("thr1"), i.get("fiv1"), i.get("thr2"), i.get("fiv2")];
				break;
			case i.get("two1"):
				choices = [i.get("fiv1"), i.get("sev1"), i.get("fiv2")];
				break;
			case i.get("thr1"):
				choices = [i.get("fiv1"), i.get("one2")];
				break;
			case i.get("for1"):
				choices = [i.get("fiv1"), i.get("one2"), i.get("two2")];
				break;
			case i.get("fiv1"):
				choices = [i.get("thr1"), i.get("sev1"), i.get("thr2")];
				break;
			case i.get("six1"):
				choices = [i.get("one2"), i.get("thr2")];
				break;
			case i.get("sev1"):
				choices = [i.get("thr1"), i.get("fiv1"), i.get("thr2")];
				break;
			case i.get("one2"):
				choices = [i.get("fiv1"), i.get("thr2"), i.get("fiv2")];
				break;
			case i.get("two2"):
				choices = [i.get("fiv1"), i.get("fiv2"), i.get("sev2")];
				break;
			case i.get("thr2"):
				choices = [i.get("sev1"), i.get("one2"), i.get("fiv2"), i.get("sev2"), i.get("one3")];
				break;
			case i.get("for2"):
				choices = [i.get("two2"), i.get("fiv2"), i.get("one3")];
				break;
			case i.get("fiv2"):
				choices = [i.get("thr2"), i.get("sev2"), i.get("thr3")];
				break;
			case i.get("six2"):
				choices = [i.get("one3"), i.get("thr3")];
				break;
			case i.get("sev2"):
				choices = [i.get("thr2"), i.get("fiv2"), i.get("thr3")];
				break;
			case i.get("one3"):
				choices = [i.get("thr2"), i.get("fiv2"), i.get("thr3"), i.get("fiv3")];
				break;
			case i.get("two3"):
				choices = [i.get("fiv2"), i.get("sev2"), i.get("fiv3")];
				break;
			case i.get("thr3"):
				choices = [i.get("sev2"), i.get("one3"), i.get("fiv3"), i.get("sev3"), i.get("one4")];
				break;
			case i.get("for3"):
				choices = [i.get("two3"), i.get("fiv3"), i.get("one4")];
				break;
			case i.get("fiv3"):
				choices = [i.get("thr3"), i.get("sev3"), i.get("one4")];
				break;
			case i.get("six3"):
				choices = [i.get("thr3"), i.get("one4")];
				break;
			case i.get("sev3"):
				choices = [i.get("thr3"), i.get("fiv3")];
				break;
			case i.get("one4"):
				choices = [i.get("thr3"), i.get("fiv3")];
				break;
		}

		harmonyTone = Math.floor(Math.random() * choices.length);
		console.log("Harmony tone => ", harmonyTone);

		let note = new Sound(`/home/ubuntu/fermata/src/actions/sounds/${harmonyTone}.wav`)
		await note.play();

		Note.lastHarmony = harmonyTone;
	}

	public toString(): string {
        return "Harmony";
    }
}

const harmony = new Harmony
export default harmony;