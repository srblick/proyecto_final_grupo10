import React from "react";
import { Col } from "react-bootstrap";

export default function Resultado({opcion}){
    return (
        <Col md="3" className="mt-5">
            <h2 className="text-center mt-5">{opcion ? "El ganador es el JUGADOR " + opcion : "Es un EMPATE"}</h2>
        </Col>
    );
}
