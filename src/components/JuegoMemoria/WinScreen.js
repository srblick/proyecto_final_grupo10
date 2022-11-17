import React from "react";
import { Link } from "react-router-dom";

export default function WinScreen() {
    return(
        <div className="HUDWinLose">
        <h1 className="msj">Felicidades Ganaste!!</h1>
        <a href="/">
            <button className="boton">Volver a jugar</button>
        </a>
        <a href="/">
            <button className="boton">Salir</button>
        </a>
        </div>
    );
}