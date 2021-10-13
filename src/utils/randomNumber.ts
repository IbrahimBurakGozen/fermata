export const randomNumber = (multiplyValue?:number):number => {
    const checkMultipyValue = multiplyValue? multiplyValue : 1;
    return Math.floor(Math.random() * checkMultipyValue);

}