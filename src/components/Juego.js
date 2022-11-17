import React, { useState } from "react";
import { Container, Row, Col, Image, Button, Card } from "react-bootstrap";
import Resultado from "./Resultado";
import MostrarJugador from "./MostrarJugador";

export default function Juego(){

    const [imgJugador1, setImgJugador1] = useState("inicio");
    const [imgJugador2, setImgJugador2] = useState("inicio");
    const [jugador1, setJugador1] = useState(0);
    const [jugador2, setJugador2] = useState(0);
    const [ganador, setGanador] = useState(0);
    const pathImage = require.context("../../img");

    const obtenerGanador = (jug1, jug2) => {
        const jugadas = [[0, 2, 1], [1, 0, 2], [2, 1, 0]];
        return jugadas[jug1][jug2];
    }

    const obtenerUrl = (nombre) => {
        return pathImage("./" + nombre + ".png");
    }

    const jugar = () =>{
        const mano = ["Piedra", "Papel", "Tijera"];
        let manoJugador1 = Math.floor(Math.random()*2.999);
        let manoJugador2 = Math.floor(Math.random()*2.999);
        let winner = obtenerGanador(manoJugador1, manoJugador2);
        setGanador(winner);

        setImgJugador1(mano[manoJugador1] + (winner === 2 ? "N" : "P"));
        setImgJugador2(mano[manoJugador2] + (winner === 1 ? "N" : "P"));

        if(winner === 1){
            setJugador1(jugador1 + 1);
        }else if(winner === 2){
            setJugador2(jugador2 + 1);
        }
    }

    return(
        <Container>
            <Row className="justify-content-md-center mb-4">
                <h1 className="text-center" > Piedra Papel Tijera </h1>
            </Row>
            <Row className="justify-content-md-center">
                <MostrarJugador 
                    img={obtenerUrl(imgJugador1)} 
                    puntaje={jugador1}
                    jugador={1}
                />
                <Resultado opcion={ganador}></Resultado>
                <MostrarJugador 
                    img={obtenerUrl(imgJugador2)} 
                    puntaje={jugador2}
                    jugador={2}
                />
            </Row>
            <Row className="justify-content-md-center">
                <Col md="4" className="text-center mt-5">
                    <Button onClick={jugar} variant="primary" size="lg" >
                        Jugar
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}
