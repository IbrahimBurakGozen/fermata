import NeoPixel from './neopixel';
import {delay} from '../utils/delay';

class Button{
  #neoPixel: any;
  button: any;
  func: any;
  lastColor: any = "rgb(0, 0, 0)";

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
    this.lastColor = color;
  }

  async animateColor(type: string){
	switch(type){
		case "pressed":
			let lastColor = this.lastColor;
			this.solidColor("rgb(50,50,50)");
			await delay(500);
			this.solidColor(lastColor);
		break;
		default:
		break;
	}
  }

}

export default Button;
