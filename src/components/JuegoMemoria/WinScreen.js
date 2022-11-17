import React from "react";
import { Link } from "react-router-dom";

export default function WinScreen() {
    return(
        <div className="HUDWinLose">
        <h1 className="style">Felicidades Ganaste!!</h1>
        <a href="/">
            <button className="button">Volver a jugar</button>
        </a>
        <a href="/">
            <button className="button">Salir</button>
        </a>
        </div>
    );
}