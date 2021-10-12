import Action from "./action";

class Small extends Action {

  onPress(): void {
    console.log('playing smoll not')
    this.playNote();
  }

  public toString(): string {
    return "Small";
}
}

const small = new Small();
export default small;