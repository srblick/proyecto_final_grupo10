import React from "react";
import { Col, Image } from "react-bootstrap";

export default function MostrarJugador({img, puntaje, jugador}){
    return (
        <Col md="3" className="text-center rounded border border-5 border-warning">
            <Image
                variant="top" 
                className="rounded-circle img-fluid mt-4" 
                width="160"
                height="160"
                src={img} 
            />
            <h2>Jugador {jugador}</h2>
            <p>Victorias: {puntaje}</p>
        </Col>
    );
}