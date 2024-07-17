import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import Card from "./Card";
import "./board.css";
import { generateRandomColorArray, verifyCards } from "../utils/logicaSimon";

const Board = () => {
    const objectCards = [
        { id: 0, brillar: false, value: "red" },
        { id: 1, brillar: false, value: "yellow" },
        { id: 2, brillar: false, value: "green" },
        { id: 3, brillar: false, value: "blue" },
        { id: 4, brillar: false, value: "magenta" }
    ];

    const [cards, setCards] = useState(objectCards);
    const [cardsGame, setCardsGame] = useState([]);
    const [cardsClicked, setCardClicked] = useState([]);
    const [puntos, setPuntos] = useState(0);

    console.log({ cards });
    console.log({ cardsGame });
    console.log({ cardsClicked });
    console.log(puntos);

    function handleClick(i) {
        const cardClicked = cards[i];
        console.log(cardClicked);
        setCardClicked(prevClicked => [...prevClicked, cardClicked]);
    }

    function startGame() {
        const patron = generateRandomColorArray();
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
                setCards(newCards);
                setTimeout(() => {
                    setCards(cards.map(card => ({ ...card, brillar: false })));
                }, 500);
                index++;
            } else {
                clearInterval(interval);
            }
        }, 1000);
    }

    function clickVerifyCards() {
        console.log(verifyCards(cardsGame, cardsClicked));
        if (verifyCards(cardsGame, cardsClicked)) {
            setPuntos(puntos + 1);
        }
        setCardClicked([]);
    }

    return (
        <div className="gameBoard">
            <button className="buttonGame" onClick={startGame}>Empieza el juego</button>
            <h1>SIMON DICE</h1>

            <div className="board">
                {objectCards.map((card, i) => (
                    <Card value={card} key={i} estado={card.brillar} />
                ))}
            </div>

            <h1>TU TURNO</h1>
            <div className="board">
                {cards.map((card, i) => (
                    <Card value={card} key={i} onCardClick={() => handleClick(i)} estado={card.brillar} />
                ))}
            </div>

            <button className="buttonGame" onClick={clickVerifyCards}>Verificar</button>
            <div className="points">Puntos: {puntos}</div>
        </div>
    );
};


const Card = ({ value, onCardClick, estado }) => {
    const className = `card ${value.value} ${estado ? 'highlighted' : ''}`;

    return (
        <button className={className} onClick={onCardClick}>
            Este
        </button>
    );
};

