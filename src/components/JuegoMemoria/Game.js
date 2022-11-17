import React from "react";
import Card from "./Card";
import "./index.css";
import { useState, useEffect } from "react";
import WinScreen from "./WinScreen"
import LoseScreen from "./LoseScreen";

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

    //Se ejecuta cuando se modifique "secondCard"
    useEffect(() => { //va a chequear la carta cuando exista una segunda.
        check();
    }, [secondCard]);

    //Esta funcion hace lo siguiente y se lo pasa al componente "Card"
    const flipCard = (name, number) => {
        if (firstCard.name === name && firstCard.number === number) { //Este if dice que si el nombre de la primera carta y su numero es igual no se volteara mas
            return 0;
        }
        if (!firstCard.name) {
            setFirstCard({ name, number });
        }
        else if (!secondCard.name) { //este else if dice que si EXISTE la primera carta pero NO EXISTE la segunda, la setea con un nombre y numero.
            setSecondCard({ name, number });
        }
        return 1;
    }
    //Esta función setea la primera carta y la segunda carta como objetos vacios.
    const resetCards = () => {
        setFirstCard({});
        setSecondCard({});
    };

    //Esta función lo que hace es agarrar el numero de la primera carta y la segunda
    const disableCards = () => {
        setDisabledCards([firstCard.number, secondCard.number]);
        resetCards(); //se utiliza la función para resetear las cartas
        setScore(score + 25); //suma el puntaje 
    };

    //Esta función lo que hace es agarrar el numero de la primera carta y la segunda
    const unflipCards = () => {
        setUnflippedCards([firstCard.number, secondCard.number]);
        resetCards(); //se utiliza la función para resetear las cartas
        setLive(live - 1)//resta los intentos permitidos
    };

    //Esta función lo que hace es chequear si las cartas son pares para ejecutar una funcion u otra
    const check = () => {
        if (firstCard.name && secondCard.name) {
            const match = firstCard.name === secondCard.name;
            match ? disableCards() : unflipCards();
        }
    }


    //Esta función retorna en el componente WinScreen
    const winner = () => {
        return <WinScreen />;
    };

    //Esta función retorna en el componente LoseScreen
    const losser = () => {
        return <LoseScreen />;
    };


    return (
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
                        //Este operador ternario hace lo siguiente...
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