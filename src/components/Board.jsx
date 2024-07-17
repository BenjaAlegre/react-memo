import { useEffect, useState } from "react";
import Card from "./Card";
import "./board.css";
import { generateRandomColorArray, verifyCards } from "../utils/logicaSimon";

const Board = () => {

    const objectCards =  [{id: 0, brillar: false, value: "red"},
                        {id: 1, brillar: false, value: "yellow"},
                        {id: 2, brillar: false, value: "green"},
                        {id: 3, brillar: false, value: "blue"},
                        {id: 4, brillar: false, value: "magenta"},
                      ]

    const [cards, setCards] = useState(objectCards);
    const [cardsHighlight, setCardsHighlight] = useState(objectCards);

    const [cardsGame, setCardsGame ] = useState([]);
    const [cardsClicked, setCardClicked] = useState([]);
    const [puntos, setPuntos] = useState([0]);
     
 
    console.log({cards});
    console.log({cardsGame});
    console.log({cardsClicked});
    console.log(puntos);

    function handleClick(i) {
        const cardClicked = cards[i];
        console.log(cardClicked);

        setCardClicked( prevClicked => [...prevClicked, cardClicked]);

    }

    function startGame() {
        const patron =  generateRandomColorArray(objectCards);
        console.log(patron);
        
        const cardsPlay = patron.map(color => {
            return cards.find(card => card.value === color);
          }).filter(card => card !== undefined);

        console.log(cardsPlay);
      
        setCardsGame(cardsPlay);

        let index = 0;
        const interval = setInterval(() => {
            if (index < cardsPlay.length) {
                const newCards = cards.map(card => {
                    if (card.id === cardsPlay[index].id) {
                        return { ...card, brillar: true };
                    }
                    return card;
                });
                setCardsHighlight(newCards);
                
                setTimeout(() => {
                    setCardsHighlight(cards.map(card => ({ ...card, brillar: false })));
                }, 1000);
                index++;
            } else {
                clearInterval(interval);
            }
        }, 2000);
        
    }

    function clickVerifyCards() {
        console.log(verifyCards(cardsGame, cardsClicked));
        if(verifyCards(cardsGame, cardsClicked)) {
            let newPoints = puntos;
            newPoints++ 
            setPuntos(newPoints)
        }
        setCardClicked([]);

    }


    return (
        <div className="gameBoard">
            <div className="container">
                <button className="buttonGame" onClick={startGame}>Empieza el juego</button>
                <button className="buttonGame" onClick={clickVerifyCards}>Verificar</button>
                <div className="points">Puntos: {puntos} </div>
            </div>
            

            <h1>SIMON DICE</h1>

            <div className="board" >
            {cardsHighlight ? cardsHighlight.map((card, i)=> (
                    <Card value={card} key={i} estado= {card.brillar} />
                )): "No hay cartas para mostrar"}  
            </div>
            
            <h1>TU TURNO</h1>
            <div className="board" >
            {cards ? cards.map((card, i)=> (
                    <Card value={card} key={i} onCardClick={() => handleClick(i)} estado= {card.brillar} />
                )): "No hay cartas para mostrar"}  
            </div>       

            

        </div>      
    );
  };


export default Board;