let score = 0;
let cacheScore = 0;

const chordThreshold = 5;
const specialThreshold = 10;

let smallClickCount = 0;
let chordClickCount = 0;  
let specialClickCount = 0;

let specialUnlocked = true;


const addScore = (amountToAdd = 1)=>{
    console.log("score before adding: ", score);
    score += amountToAdd;
    cacheScore += amountToAdd;
    checkConditions();
}


//Score functions
function smallScore() {
// When a basic button is pressed, add 1 to 3 points to the score towards unlocking chords (smallButtonScore)
    addScore();
    smallClickCount++;
    console.log(`
        Small is pressed
        ----------------
        score: ${score}
        click count: ${smallClickCount}
    `);
}

function chordScore() {
    if (score >= chordThreshold) {
        //if(smallClickCount >= 2){
            addScore(3);
            console.log(`
            Chord is pressed
            ----------------
            score: ${score}
            click count: ${chordClickCount}
        `);
        // }else{
        //     console.log("Cord overloading press small to unlock chord again")
        // }     
    }else{
        console.log("\x1b[31m","Chord Threshold not unlocked yet", "\x1b[0m");
    }
}

function specialScore() {
    if (score >= specialThreshold && specialUnlocked ) {
        addScore(10);
        specialUnlocked = false;
        cacheScore = 0;

        console.log(`
            Special is pressed
            ----------------
            score: ${score}
            click count: ${specialClickCount}
        `);
    }else{
        console.log("\x1b[31m","Special Threshold not unlocked yet", "\x1b[0m");
    }
}

const checkConditions = ()=>{
    if(cacheScore >= 10 && !specialUnlocked){
        specialUnlocked = true;
        cacheScore = 0;
        console.log("\x1b[32m","Special unlocked", "\x1b[0m");
    }
}

smallScore();
smallScore();

chordScore(); //test if treshold works

smallScore();
smallScore();
smallScore();

chordScore();

specialScore(); // test if treshold works

chordScore();

specialScore();
specialScore(); // test if able to press again;

chordScore();
chordScore();
chordScore();
chordScore();
chordScore();
chordScore();
chordScore();

specialScore();
specialScore();

