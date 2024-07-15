import { useState } from "react";
import "./card.css";

const Card = ({ value, onCardClick, estado }) => {


    if(estado){
        return  <button className="card" onClick={onCardClick}>
        {value.value}
        </button> 
    } else {
        return  <button className="card" onClick={onCardClick}>
       ?
        </button>  
    }
     
};

export default Card;