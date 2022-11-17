import React from "react";
import Card from "./components/Card";
import "./index.css";
import { useState, useEffect } from "react";
import WinScreen from "./components/WinScreen";
import LoseScreen from "./components/LoseScreen";

import { images } from "./Import";


export default function Game() {

    //variable para el estado de las cartas.
    const [cards, setCards] = useState([]);

    //variable para el estado de la PRIMERA carta.
    const [firstCard, setFirstCard] = useState({});

    //variable para el estado de la SEGUNDA carta.
    const [secondCard, setSecondCard] = useState({});

    const [unflippedCards, setUnflippedCards] = useState([]); //es un arreglo que contiene los numeros de las cartas que necesitan retornar a su origen
    const [disabledCards, setDisabledCards] = useState([]);  //es un arreglo que contiene los numeros de las cartas que necesitan ser deshabilitadas porque fueron pares

    //variable para hacer un puntaje
    const [score, setScore] = useState(0);

    //variable para limitar los errores permitidos
    const [live, setLive] = useState(5);

    //Esta función lo que hace es desordenar el orden de las cartas.
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          let temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
      }

     //Se ejecuta una vez despues de renderizar.
    useEffect(() => {
        shuffleArray(images); //setea las imagenes para alterar su orden.
        setCards(images); //setea las imagenes del arreglo de images.
    }, [])

    useEffect(() => { //va a chequear la carta cuando exista una segunda.
        check();
    }, [secondCard]);

    const flipCard = (name, number) => {
        if(firstCard.name === name && firstCard.number === number){
            return 0; //este if dice que si la primera carta que volteaste tiene el mismo numero y nombre, no se volteara mas, queda bloqueada.
        }
        if(!firstCard.name){ //este if dice que si la PRIMERA CARTA NO EXISTE la setea con un numero y nombre.
            setFirstCard({ name, number }); 
        }
        else if(!secondCard.name){ //este else if dice que si EXISTE la primera carta pero NO EXISTE la segunda, la setea con un nombre y numero.
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
        resetCards(); //se utiliza la función para resetear las cartas
        setScore(score + 25);
    };

    const unflipCards = () => {
        setUnflippedCards([firstCard.number, secondCard.number]); 
        resetCards(); //se utiliza la función para resetear las cartas
        setLive(live - 1)
    };

    const resetCards = () => { //setea la primera carta y la segunda carta como objetos vacios.
        setFirstCard({});
        setSecondCard({});
    };

    const winner = () => {
        return <WinScreen />;
    };
    
    const losser = () => {
        return <LoseScreen />;
    };


    return(
        <body className="body">
            <header className="header">
                <h1>JUEGO DE LA MEMORIA</h1>
            </header>
            <div className="HUD">
                <h2 className="puntaje">Puntaje: {score}</h2>
                <h2 className="intentos">Intentos permitidos: {live}</h2>
            </div>
            <div className="app" >
                <div className="cards-container" >
                    {
                        score >= 150 ? winner() : live <= 0 ? losser() : 
                         cards.map((card, index) => ( //por cada una de las cartas devuelve el componente "Card"
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
            <footer className="footer">
                <h2>Grupo 10!!!</h2>
            </footer>
        </body>
    );
}