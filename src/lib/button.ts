const five = require('johnny-five');

class Button{
  #neoPixel: any;
  button: any

  /*
  {
    button: five.button,
    neopixel: neopixelObject
  }
  */

  constructor(data: any){
    console.log(data.button);

    this.#neoPixel = data.neoPixel;
    this.button = new five.Button(data.button);

    this.button.on("down", () => {
      console.log("button pressed");
      this.solidColor("#F00");
    });
  }

  // kleuren

  solidColor(color: string){
    this.#neoPixel.color(color);
  }

}

export default Button;