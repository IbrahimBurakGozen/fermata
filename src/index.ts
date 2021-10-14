import { delay } from './utils/delay';
import mode from './logic/Mode';
import chord from './actions/chord.action';
import small from './actions/small.action';
import transpose from './actions/transpose.action';
import octave from './actions/octave.action';
import Action from './actions/action';
import { randomNumber } from './utils/randomNumber';
import vamp from './actions/vamp.action';
import harmony from './actions/harmony.action';
import note from './logic/Note';

const five = require('johnny-five');
const pixel = require('node-pixel');

import NeoPixel from './lib/neopixel';
import Button from './lib/button';

import { EventEmitter } from 'stream';



//Gamification
let smallButtonScore: number = 0;
let chordButtonScore: number = 0;
let specialButtonScore: number = 0;


let smallThreshold: number;
let chordThreshold: number;
let specialThreshold: number;

let octaveUnlockScore: number;
let chordsUnlockScore: number;
let specialUnlockScore: number;

let chordsAreUnlocked: boolean = false;
let specialsAreUnlocked: boolean = false;


enum MODE {
    active,
    inactive
}

let currentMode: MODE = MODE.inactive;

// MAIN


let board = new five.Board();
 
board.on("ready", () => {

    process.setMaxListeners(100);
    note.lastRecorded = "C3"
    mode.init();


    let strip = new pixel.Strip({
        board: board,
        controller: "FIRMATA",
        strips: [ {pin: "10", length: 160}, {pin: "12", length: 16} ],
        gamma: 2.8,
    });

    strip.on("ready", () => {

        console.log("strip length", strip.length);
        strip.color("rgb(150,150,150)");
        strip.show();
    });


    
    const VAMP_BUTTON: any = new Button({
        button: new five.Button({
            pin: 2,
            isPullup: true
        }),
        neoPixel: {start: 0, length: 23, strip: strip},
        func: function(){vamp.onPress()},
        animation: "loop"
    });

    const SMALL_1_BUTTON: any = new Button({
        button: new five.Button({
            pin: 5,
            isPullup: true
        }),
        neoPixel: {start: 24, length: 15, strip: strip},
        func: function(){smallAction()},
        animation: "random"
    });

    const SMALL_2_BUTTON: any = new Button({
        button: new five.Button({
            pin: 6,
            isPullup: true
        }),
        neoPixel: {start: 40, length: 15, strip: strip},
        func: function(){smallAction()},
        animation: "random"
    });

    const SMALL_3_BUTTON: any = new Button({
        button: new five.Button({
            pin: 9,
            isPullup: true
        }),
        neoPixel: {start: 56, length: 15, strip: strip},
        func: function(){smallAction()},
        animation: "random"
    });

    const TRANSPOSE_BUTTON: any = new Button({
        button: new five.Button({
            pin: 8,
            isPullup: true
        }),
        neoPixel: {start: 72, length: 23, strip: strip},
        func: function(){transpose.onPress()},
        animation: "loop"
    });

    const HARMONY_BUTTON: any = new Button({
        button: new five.Button({
            pin: 7,
            isPullup: true
        }),
        neoPixel: {start: 96, length: 15, strip: strip},
        func: function(){harmony.onPress()},
        animation: "loop"
    });

    const CHORD_BUTTON: any = new Button({
        button: new five.Button({
            pin: 4,
            isPullup: true
        }),
        neoPixel: {start: 112, length: 23, strip: strip},
        func: function(){chord.onPress()},
        animation: "loop"
    });

    const OCTAVE_BUTTON: any = new Button({
        button: new five.Button({
            pin: 3,
            isPullup: true
        }),
        neoPixel: {start: 136, length: 23, strip: strip},
        func: function(){octave.onPress()},
        animation: "loop"
    });

    


    const ROCKET_STRIP: any = new NeoPixel({
        start: 160,
        length: 15,
        strip: strip
    });



    CHORD_BUTTON.solidColor("rgb(150,0,0)");
    SMALL_1_BUTTON.solidColor("rgb(150,150,150)");
    SMALL_2_BUTTON.solidColor("rgb(150,150,150)");
    SMALL_3_BUTTON.solidColor("rgb(150,150,150)");
    TRANSPOSE_BUTTON.solidColor("rgb(0,150,0)");
    HARMONY_BUTTON.solidColor("rgb(0,0,150)");
    VAMP_BUTTON.solidColor("rgb(150,0,0)");
    OCTAVE_BUTTON.solidColor("rgb(150,0,0)");

    let ROCKET_ANIMATION = ROCKET_STRIP.rainbow(20);


      //Score functions
      
      function smallScore() {

        // When a basic button is pressed, add 1 to 3 points to the score towards unlocking chords (smallButtonScore)
          smallButtonScore += randomNumber(3);

      }

      function chordScore() {

        // When a chord button is pressed, check if the chords are unlocked or if score is sufficient (threshold).
        if (chordButtonScore >= chordThreshold) {
            
            // Substract some points / currency to prevent spamming

            // Add 1 to 3 points to the score towards unlocking specials.
        }


          
      }

      function specialScore() {

        // When a special button is pressed, check if the specials are unlocked or if score is sufficient.
        if (specialButtonScore >= specialThreshold) {

            // Substract some points / currency to prevent spamming
            
        }
          
      }

      // Basic/small button functions

    function smallAction() {
        smallScore();
        console.log("Small note");
        small.onPress();
    }


    // Buttons init







    // SMALL_BUTTON_2.on("down", () => {
    //     smallAction();
    // });

    // SMALL_BUTTON_3.on("down", () => {
    //     smallAction();
    // });

    // SMALL_BUTTON_2.on("down", smallAction());
    // SMALL_BUTTON_3.on("down", smallAction());

    // OCTAVE_BUTTON.on("down", () => {
    //     console.log("Octave notes");
    //     octave.onPress();
    //     smallScore();
    // })
    
    // VAMP_BUTTON.on("down", () => {
    //     console.log("Vamp chord");
    //     vamp.onPress();
    //     chordScore();
    // })

    // CHORD_BUTTON.on("down", () => {
    //     console.log("Vamp chord");
    //     chord.onPress();
    //     chordScore();
    // })

    // HARMONY_BUTTON.on("down", () => {
    //     console.log("Harmony action");
    //     harmony.onPress();
    //     specialScore();
    // })

    // TRANSPOSE_BUTTON.on("down", () => {
    //     console.log("Transposed!");
    //     transpose.onPress();
    //     specialScore();
    // })

}); 




/* const ACTIONS_NAMES_ARRAY: Array<Action> = [small,octave, vamp, chord,harmony, transpose]; //small ,chord,transpose,octave
main()
   
async function main(){
    mode.index = 0;
    mode.init();
    note.lastRecorded = "C3"

while (true) {
    
    for await (const action of ACTIONS_NAMES_ARRAY) {
        console.log(action.toString() + " is playing")
        action.onPress()
        await delay(3000);
    }
}
} */
