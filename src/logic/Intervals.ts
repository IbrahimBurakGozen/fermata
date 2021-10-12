import key from "./Key";
import mode from "./Mode";

class Intervals {
    
    public DATABASE: Array<String> = ["one1", "two1", "thr1", "for1", "fiv1", "six1", "sev1", "one2", "two2", "thr2", "for2", "fiv2", "six2", "sev2", "one3", "two3", "thr3", "for3", "fiv3", "six3", "sev3", "one4"];

    public updated: Boolean = false;
    public loadout: Map<String, String>;

    public populate() {
        console.log("populating");
        if (this.updated == false) {
            let modeOffset: number;

            console.log(`Current key: ${key.current}`)
            console.log(`Current mode: ${mode.DATABASE[mode.index].name}`)
            //Dit werkt niet meer
            if (key.current == "C Minor") {
                modeOffset = mode.DATABASE[mode.index].minorPos;
                console.log("Minor position")
            } else {
                modeOffset = mode.DATABASE[mode.index].majorPos;
                console.log("Major position")
            }

            this.loadout = new Map();

            this.DATABASE.forEach((element,index) =>{
                this.loadout.set(element,key.DATABASE[key.index][index + modeOffset])
            })

            // for (let i = 0; i <= this.DATABASE.length - 1; i++) {
            //     let offset = key.DATABASE[Math.floor(Math.random() * 2)];
            //     let newLoadout = offset[i + modeOffset];
            //     this.loadout.set(this.DATABASE[i], newLoadout);                
            // }

            this.updated = true;
            console.log(this.loadout);
        }
        else return this.loadout;
    }
}

const intervals = new Intervals();
export default intervals;