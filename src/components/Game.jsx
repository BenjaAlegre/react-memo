import { useState } from "react";
import Board from "./Board";

export default function Game() {
//     //const [history, setHistory] = useState([Array(9).fill(null)]);
//   //  const [currentMove, setCurrentMove] = useState(0);
//     const xIsNext = currentMove % 2 === 0;
//     const currentSquares = history[currentMove];
    const cardValues = [1,1,2,2,3,3];

    const objectCards = [{id: 0, isHide: false, value: 1},
        {id: 1, isHide: false, value: 1},
        {id: 2, isHide: false, value: 2},
        {id: 3, isHide: false, value: 3},
        {id: 4, isHide: false, value: 2},
        {id: 5, isHide: false, value: 3}]

    const [cards, setCards] = useState(objectCards);
    const [cardMostradas, setCardMostradas ] = useState([]);
    const [cardFinish, setCardFinish ] = useState([]);

    return (
      <div className="game">
        <div className="game-board">
          {/* <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} /> */}
          <Board cardValues = {cards}></Board>
        </div>
        
      </div>
    );
  }
