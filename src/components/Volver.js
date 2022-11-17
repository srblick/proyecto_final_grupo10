import React from "react";
import { Col } from "react-bootstrap";
import estilo from "./styles/Menu.module.css";

export default function Volver(){
    return(
        <Col md="4" className="text-center">
            <a href="/">
                <button className={estilo.boton}>Volver</button>
            </a>
        </Col>
    );
}