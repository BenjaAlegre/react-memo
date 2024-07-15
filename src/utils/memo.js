export const compareCards = ( cards) => {

    console.log("evaluando:");
    console.log(cards[0]);
    console.log(cards[1]);
    return cards[0].value === cards[1].value ? true : false;
        
}