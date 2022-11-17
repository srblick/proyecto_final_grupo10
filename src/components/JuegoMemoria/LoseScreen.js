import React from "react";
import { ReactDOM } from "react";

export default function LoseScreen() {
    return(
        <div className="HUDWinLose">
        <h1 className="style">Has Perdido!</h1>
        <a href="/">
            <button className="button">Reintentar</button>
        </a>
        <a href="/">
            <button className="button">Salir</button>
        </a>
        </div>
    );
}