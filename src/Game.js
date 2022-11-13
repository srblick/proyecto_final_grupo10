import React from "react";
import Card from "./components/Card";
import "./index.css";
import { useState, useEffect } from "react";

import { images } from "./Import";


export default function Game() {

    const [cards, setCards] = useState([]);
    const [firstCard, setFirstCard] = useState({});
    const [secondCard, setSecondCard] = useState({});

    const [unflippedCards, setUnflippedCards] = useState([]);
    const [disabledCards, setDisabledCards] = useState([]);

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          let temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
      }

    useEffect(() => {
        shuffleArray(images);
        setCards(images);
    }, [])

    useEffect(() => {
        check();
    }, [secondCard]);

    const flipCard = (name, number) => {
        if(firstCard.name === name && firstCard.number === number){
            return 0;
        }
        if(!firstCard.name){
            setFirstCard({ name, number });
        }
        else if(!secondCard.name){
            setSecondCard({ name, number });
        }
        return 1;
    }

    const check = () =>{
        if(firstCard.name && secondCard.name){
            const match = firstCard.name === secondCard.name;
            match ? disableCards() : unflipCards();
        }
    }

    const disableCards = () => {
        setDisabledCards([firstCard.number, secondCard.number]);
        resetCards();
    };

    const unflipCards = () => {
        setUnflippedCards([firstCard.number, secondCard.number]);
        resetCards();
    };

    const resetCards = () => {
        setFirstCard({});
        setSecondCard({});
    };

    return(
        <div className="app" >
            <div className="cards-container" >
                {
                    cards.map((card, index) => (
                        <Card 
                        name={card.logo} 
                        number={index} 
                        front={card.src} 
                        flipCard={flipCard} 
                        unflippedCards={unflippedCards}
                        disabledCards={disabledCards}
                        />

                    ))
                }
            </div>
        </div>
    );
}