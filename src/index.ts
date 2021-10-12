import { delay } from './utils/delay';
import mode from './logic/Mode';
import chord from './actions/chord.action';
import small from './actions/small.action';
import transpose from './actions/transpose.action';
import octave from './actions/octave.action';
import Action from './actions/action';

const ACTIONS_NAMES_ARRAY: Array<Action> = [small ,chord,transpose,octave]; //small ,chord,transpose,octave

main()
   
async function main(){
    mode.init();

    for await (const action of ACTIONS_NAMES_ARRAY) {
        console.log(action.toString() + " is playing")
        action.onPress()
        await delay(3000);
    }
}
