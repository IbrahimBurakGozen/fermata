import {delay} from '../utils/delay';

const randomColor = ["#1abc9c","#2ecc71","#3498db","#9b59b6","#f1c40f","#e67e22","#e74c3c","#ffffff"];

class NeoPixel {

  #pixelData: any;
  #strip: any;
  #prevColor: any = "rgb(0, 0, 0)";

  /*
  {
    start: 0, // startwaarde
    length: 16 // aantal pixels
    strip: // strip data
  }
  */

  constructor(data: any){
    this.#strip = data.strip;
    this.#pixelData = data;
  }

  solidColor(color: string){

    console.log("changing color");

    //this.#strip.on("ready", () => {
      for(let i = (this.#pixelData.start); i <= (this.#pixelData.start + this.#pixelData.length); i++){
        if(i >= 0){
          this.#strip.pixel(i).color(color);
        }
      }
      this.#prevColor = color;
      this.#strip.show();
    //});
  }

  async loop(){

    let random: any = randomColor[Math.floor(Math.random()*randomColor.length)];

    for(let i = (this.#pixelData.start); i <= (this.#pixelData.start + this.#pixelData.length); i++){
      if(i >= 0){
        this.#strip.pixel(i).color(random);
        await delay(50);
        this.#strip.show();

      }
    }

  }

  randomColor(){
    this.solidColor(randomColor[Math.floor(Math.random()*randomColor.length)]);
  }

  rainbow(delay: number){
    let showColor;
    let cwi = 0; // colour wheel index (current position on colour wheel)
    let foo = setInterval(() => {
      if (++cwi > 255) {
        cwi = 0;
      }

      for(let i = (this.#pixelData.start); i <= (this.#pixelData.start + this.#pixelData.length); i++) {
        showColor = this.colorWheel( ( cwi+i ) & 255 );
        this.#strip.pixel( i ).color( showColor );
      }
      this.#strip.show();
    }, 1000/delay);

    return foo;
  }






  protected colorWheel( WheelPos: number ){
    var r,g,b;
    WheelPos = 255 - WheelPos;

    if ( WheelPos < 85 ) {
        r = 255 - WheelPos * 3;
        g = 0;
        b = WheelPos * 3;
    } else if (WheelPos < 170) {
        WheelPos -= 85;
        r = 0;
        g = WheelPos * 3;
        b = 255 - WheelPos * 3;
    } else {
        WheelPos -= 170;
        r = WheelPos * 3;
        g = 255 - WheelPos * 3;
        b = 0;
    }
    // returns a string with the rgb value to be used as the parameter
    return "rgb(" + r +"," + g + "," + b + ")";
}


}

export default NeoPixel;
