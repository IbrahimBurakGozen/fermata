import NeoPixel from './neopixel';

class Button{
  #neoPixel: any;
  button: any;
  func: any;

  /*
  {
    button: five.button,
    neopixel: neopixelObject
    func: functie
  }
  */

  constructor(data: any){
    this.#neoPixel = new NeoPixel(data.neoPixel);
    this.button = data.button;
    //this.func = data.func;

    this.button.on("down", () => {
      console.log("button pressed");
      this.#neoPixel.solidColor("#F00");
      data['func']();
    });
  }

  // kleuren

  solidColor(color: string){
    this.#neoPixel.solidColor(color);
  }

}

export default Button;