import { useEffect, useState } from "react";
import Card from "./Card";
import "./board.css";
import { compareCards } from "../utils/memo";

const Board = () => {

    const objectCards =  [{id: 0, mostrar: false, value: 1},
                        {id: 1, mostrar: false, value: 1},
                        {id: 2, mostrar: false, value: 2},
                        {id: 3, mostrar: false, value: 3},
                        {id: 4, mostrar: false, value: 4},
                        {id: 5, mostrar: false, value: 4},
                        {id: 6, mostrar: false, value: 5},
                        {id: 7, mostrar: false, value: 5},
                        {id: 8, mostrar: false, value: 2},
                        {id: 9, mostrar: false, value: 3},
                        {id: 10, mostrar: false, value: 9},
                        {id: 11, mostrar: false, value: 9},]
    

    const [cards, setCards] = useState(objectCards);
    const [cardMostradas, setCardMostradas ] = useState([]);
    const [cardFinish, setCardFinish ] = useState([]);
    
    console.log({cards});
    console.log({cardMostradas});
    console.log({cardFinish});

    useEffect(() => {
        if (cardMostradas.length === 2) {
            if (compareCards(cardMostradas)) {

                setCardFinish(prevFinish => [...prevFinish, ...cardMostradas]);
            } else {
                const backCards = cardMostradas;
                backCards.forEach(e => e.mostrar = false);
                const updatedCards = cards.map(i => {
                    if (backCards.includes(e=> e.id = i.id))
                    {
                        i.mostrar = false;
                    }
                    return i
                })
                setCards(updatedCards)
            }
            
            setCardMostradas([]);
        }
    }, [cardMostradas]);


    
    function handleClick(i) {
        const cardClicked = cards[i];
        if (cardMostradas.length < 2) {
            setCardMostradas(prevMostradas => [...prevMostradas, cardClicked]);
        }
        const newCards = cards;
        newCards[i].mostrar = true;
        setCards(newCards);
        
    }


    return (
        <div>

        <h1>Juego de Cartas</h1>

        <div className="board" >
        {cards ? cards.map((card, i)=> (
                <Card value={card} key={i} onCardClick= {() => handleClick(i) } estado= {card.mostrar}/>
            )): "No hay cartas para mostrar"}  
        </div>
        
        <h1>Pares encontrados</h1>
        <div className="board" >
        {cardFinish ? cardFinish.map((card, i)=> (
                <Card value={card} key={i} estado= {card.mostrar}/>
            )): "No hay cartas para mostrar"}  
        </div>

        </div>      
    );
  };


export default Board;