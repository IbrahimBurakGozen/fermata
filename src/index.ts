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

//const five: any = require('johnny-five');
//const pixel: any = require('node-pixel')


//Pinout init
//Pinouts are bound to change
/* 
const SMALL_BUTTON_1= five.Button(2);
const SMALL_BUTTON_2 = five.Button(3);
const SMALL_BUTTON_3 = five.Button(4);

const OCTAVE_BUTTON = five.Button(5);
const VAMP_BUTTON = five.Button(6);
const CHORD_BUTTON = five.Button(7);

const HARMONY_BUTTON = five.Button(8);
const TRANSPOSE_BUTTON = five.Button(9);

const PIXEL_STICKS_PIN = 10


const PIXEL_RING_SMALL_PIN = "AO";
const PIXEL_RING_BIG_CHORDS_PIN = null;
const PIXEL_RING_BIG_HARMONY_PIN = null;
const PIXEL_RING_BIG_TRANSPOSE_PIN = null;
 */
// NeoPixel sticks and rings
let pixelSticks
let smallRings;
let bigRingsChords;
let bigRingsHarmony;
let bigRingsTranspose;



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

//let board = new five.Board();
/* 
board.on("ready", () => {


    //NeoPixel Stick init
    pixelSticks = new pixel.Strip({
        board: this,
        controller: "FIRMATA",
        strips: [ {pin: PIXEL_STICKS_PIN, length: 32}, ],
        gamma: 2.8,
    });
    
    // Small rings init
    smallRings = new pixel.Strip({
        board: this,
        controller: "FIRMATA",
        strips: [ {pin: PIXEL_RING_BIG_CHORDS_PIN, length: 64}, ],
        gamma: 2.8,
    });

    // Big rings init
    bigRingsChords = new pixel.Strip({
        board: this,
        controller: "FIRMATA",
        strips: [ {pin: PIXEL_RING_SMALL_PIN, length: 48}, ],
        gamma: 2.8,
    });
    bigRingsHarmony = new pixel.Strip({
        board: this,
        controller: "FIRMATA",
        strips: [ {pin: PIXEL_RING_BIG_HARMONY_PIN, length: 24}, ],
        gamma: 2.8,
    });
    bigRingsTranspose = new pixel.Strip({
        board: this,
        controller: "FIRMATA",
        strips: [ {pin: PIXEL_RING_BIG_TRANSPOSE_PIN, length: 24}, ],
        gamma: 2.8,
    });


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

    SMALL_BUTTON_1.on("down", smallAction());
    SMALL_BUTTON_2.on("down", smallAction());
    SMALL_BUTTON_3.on("down", smallAction());

    OCTAVE_BUTTON.on("down", () => {
        console.log("Octave notes");
        octave.onPress();
        smallScore();
    })
    
    VAMP_BUTTON.on("down", () => {
        console.log("Vamp chord");
        vamp.onPress();
        chordScore();
    })

    CHORD_BUTTON.on("down", () => {
        console.log("Vamp chord");
        vamp.onPress();
        chordScore();
    })

    HARMONY_BUTTON.on("down", () => {
        console.log("Harmony action");
        harmony.onPress();
        specialScore();
    })

    TRANSPOSE_BUTTON.on("down", () => {
        console.log("Transposed!");
        transpose.onPress();
        specialScore();
    })

}); */




const ACTIONS_NAMES_ARRAY: Array<Action> = [small,octave, vamp, chord,harmony, transpose]; //small ,chord,transpose,octave
main()
   
async function main(){
    mode.index = 0;
    mode.init();
    note.lastRecorded = "C3"

    for await (const action of ACTIONS_NAMES_ARRAY) {
        console.log(action.toString() + " is playing")
        action.onPress()
        await delay(3000);
    }
}
