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



// MAIN


let board = new five.Board();
 
board.on("ready", () => {

    note.lastRecorded = "C3"
    mode.init();

    /*const SMALL_BUTTON_1 = new five.Button(2);
    const SMALL_BUTTON_2 = new five.Button(3);
    const SMALL_BUTTON_3 = new five.Button(4);

    const OCTAVE_BUTTON = new five.Button(5);
    const VAMP_BUTTON = new five.Button(6);
    const CHORD_BUTTON = new five.Button(7);

    const HARMONY_BUTTON = new five.Button(8);
    const TRANSPOSE_BUTTON = new five.Button(9);*/


    let strip = new pixel.Strip({
        board: board,
        controller: "FIRMATA",
        strips: [ {pin: "3", length: 160}, ],
        gamma: 2.8,
    });

    strip.on("ready", async () => {

        strip.color("#000");

        strip.show();

        const CHORD_BUTTON: any = new Button({
            button: {
                pin: 2,
                isPullup: true
            },
            neoPixel: new NeoPixel({start: 0, length: 23, strip: strip})
        });

        CHORD_BUTTON.solidColor("#0F0");

        // const SMALL_1_BUTTON: any = new Button({
        //     button: new five.Button({
        //         pin: 2,
        //         isPullup: true
        //     }),
        //     neoPixel: new NeoPixel({start: 24, length: 15, strip: strip})
        // });

        // SMALL_1_BUTTON.solidColor("cyan");

        // SMALL_1_BUTTON.button.on("down", () => {
        //     console.log("button pressed");
        // });

        // const SMALL_2_BUTTON: any = new Button({
        //     button: new five.Button({
        //         pin: 2,
        //         isPullup: true
        //     }),
        //     neoPixel: new NeoPixel({start: 40, length: 15, strip: strip})
        // });

        // const SMALL_3_BUTTON: any = new Button({
        //     button: new five.Button({
        //         pin: 2,
        //         isPullup: true
        //     }),
        //     neoPixel: new NeoPixel({start: 56, length: 15, strip: strip})
        // });


        // const TRANSPOSE_RING: any = new NeoPixel({start: 72, length: 23, strip: strip});
        // TRANSPOSE_RING.color("#0F0");

        // const HARMONY_RING: any = new NeoPixel({start: 96, length: 15, strip: strip});
        // HARMONY_RING.color("#00F");

        // const VAMP_RING: any = new NeoPixel({start: 112, length: 23, strip: strip});
        // VAMP_RING.color("#0F0");

        // const OCTAVE_RING: any = new NeoPixel({start: 136, length: 23, strip: strip});
        // OCTAVE_RING.color("#00F");



        // for(let i = 0; i <= 159; i++){
        //     strip.pixel(i).color("#F00");
        //     strip.show();
        //     console.log(i);
        //     await delay(1000);
        //   }



    });




    //NeoPixel Stick init
    // pixelSticks = new pixel.Strip({
    //     board: this,
    //     controller: "FIRMATA",
    //     strips: [ {pin: PIXEL_STICKS_PIN, length: 32}, ],
    //     gamma: 2.8,
    // });
    
    // Small rings init
    // smallRings = new pixel.Strip({
    //     board: this,
    //     controller: "FIRMATA",
    //     strips: [ {pin: PIXEL_RING_BIG_CHORDS_PIN, length: 16} ], // 64
    //     gamma: 2.8
    // });

    // // Big rings init
    // bigRingsChords = new pixel.Strip({
    //     board: this,
    //     controller: "FIRMATA",
    //     strips: [ {pin: PIXEL_RING_SMALL_PIN, length: 48}, ],
    //     gamma: 2.8,
    // });
    // bigRingsHarmony = new pixel.Strip({
    //     board: this,
    //     controller: "FIRMATA",
    //     strips: [ {pin: PIXEL_RING_BIG_HARMONY_PIN, length: 24}, ],
    //     gamma: 2.8,
    // });
    // bigRingsTranspose = new pixel.Strip({
    //     board: this,
    //     controller: "FIRMATA",
    //     strips: [ {pin: PIXEL_RING_BIG_TRANSPOSE_PIN, length: 24}, ],
    //     gamma: 2.8,
    // });



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

    // const SMALL_BUTTON_1 = new five.Button({
    //             pin: 2,
    //             isPullup: true
    //         });

    // SMALL_BUTTON_1.on("down", () => {
    //     smallAction();
    //     console.log("BUTTON 1 PRESSED");

    // });







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
