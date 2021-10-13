class NeoPixel {

  #pixelData: any;
  #strip: any;

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

  color(color: string){

    for(let i = (this.#pixelData.start - 3); i <= (this.#pixelData.start + this.#pixelData.length); i++){
      if(i >= 0){
        this.#strip.pixel(i).color(color);
      }
    }

    this.#strip.show();
  }


}

export default NeoPixel;