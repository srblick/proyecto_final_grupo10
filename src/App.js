import Phaser from "phaser";
import { useEffect } from "react";
import { React, useState } from "react";
import Escena from "./components/Escena";

export default function App(){
    const [listo, setListo] = useState(false);

    useEffect(()=>{
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 200 }
                }
            },
            scene:[Escena]
        /*    scene: {
                preload: preload,
                create: create
            }*/
        };
        // arranca el Juego
        const game = new Phaser.Game(config);
        //trigger el juego esta completamente listo
        game.events.on("LISTO", setListo);
        //sino pongo esto se acumulan duplicados del lienzo
        return ()=>{
            setListo(false);
            game.destroy(true);
        }
    },[listo])
    
}