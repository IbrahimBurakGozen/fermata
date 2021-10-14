import NeoPixel from './neopixel';

class Button{
  #neoPixel: any;
  button: any;
  func: any;
  lastColor: any = "rgb(0, 0, 0)";

  /*
  {
    button: five.button,
    neopixel: neopixelObject,
    func: functie,
    animation: animatietype
  }
  */

  constructor(data: any){
    this.#neoPixel = new NeoPixel(data.neoPixel);
    this.button = data.button;

    this.button.on("down", async () => {
      console.log("button pressed");

      data['func']();

      switch(data.animation){
        case "loop":
          this.#neoPixel.loop();
          break;
        case "random":
          this.#neoPixel.randomColor();
          break;
        default:
          break;
      }

    });
  }

  // kleuren

  solidColor(color: string){
    this.#neoPixel.solidColor(color);
    this.lastColor = color;
  }

}

export default Button;
