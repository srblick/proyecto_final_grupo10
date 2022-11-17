import React, { useEffect } from 'react'
import { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import back from "./images/pregunta.png";

const Card = ({ name, number, front, flipCard, unflippedCards, disabledCards }) => {
    const [isFlipped, setIsFlipped] = useState(false); //este useState dice si la carta esta volteada o no
    const [hasEvent, setHasEvent] = useState(true); //este useState dice que esta variable tiene un evento que cumplir

    useEffect(() => {
        if(unflippedCards.includes(number)){ //este if dice que si se ejecuta unflippedCards la carta vuelve a su estado original, en 700 ms.
            setTimeout(() => setIsFlipped(false), 700);
        }
    }, [unflippedCards])

    useEffect(() => {
        if(disabledCards.includes(number)){ //si las cartas se deshabilitan se desactiva el volteo de las cartas.
            setHasEvent(false);
        }
    }, [disabledCards])

    const handleClick = e => { //llama a la función "flipCard" y dice que si su valor es distinto de cero, se voltea la carta.
        const value = flipCard(name, number);
        if(value !== 0){ 
            setIsFlipped(!isFlipped);
        }
    
    }

  return (
    <div className='card'>
        <ReactCardFlip isFlipped={isFlipped} >
            {/** Esta linea muestra la parte de atras de la carta */}
            <img className='card-image' src={back} alt='parte-de-atras' onClick={hasEvent ? handleClick: null}/>
            {/** Esta linea muestra la parte de adelante de la carta */}
            <img className='card-image' src={front} alt='parte-de-adelante' onClick={hasEvent ? handleClick: null}/>
        </ReactCardFlip>
    </div>
  )
}

export default Card;