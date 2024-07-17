
export const generateRandomColorArray =(cards) => {

  const colors = cards.map(e => e.value)


    const maxLength = 6;
    const minLength = 1;
    const arrayLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    const randomArray = [];
  
    for (let i = 0; i < arrayLength; i++) {
      const randomIndex = Math.floor(Math.random() * colors.length);
      randomArray.push(colors[randomIndex]);
    }
  
    return randomArray;
  }



export const verifyCards = (trueArray, verifyArray) => {

    const aux1 = trueArray.map( e => e.id )
    const aux2 = verifyArray.map( e => e.id )

    console.log(aux1);
    console.log(aux2);

    return JSON.stringify(aux1) === JSON.stringify(aux2)
}