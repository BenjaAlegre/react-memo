import { useState } from "react";
import "./card.css";

const Card = ({ value, onCardClick, estado}) => {

    const className = `card ${value.value} ${estado ? 'highlighted' : ''}`;
   
        return  <button className= {className} onClick={onCardClick}>
        </button>
    

};

export default Card;