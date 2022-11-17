import React from "react";
import { ReactDOM } from "react";


export default function LoseScreen() {
    return(
        <div className="HUDWinLose">
        <h1 className="msj">Has Perdido!</h1>
        <a href="/">
            <button className="boton">Reintentar</button>
        </a>
        <a href="/">
            <button className="boton">Salir</button>
        </a>
        </div>
    );
}