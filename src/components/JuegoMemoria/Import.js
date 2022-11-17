import src1 from "./images/cardsImages/halfLife.png"
import src2 from "./images/cardsImages/konami.png"
import src3 from "./images/cardsImages/mortalKombat.png"
import src4 from "./images/cardsImages/naughtyDog.png"
import src5 from "./images/cardsImages/superMario.png"
import src6 from "./images/cardsImages/valve.png"

/** PRIMERO SE IMPORTAN LAS CARTAS DESDE EL "IMPORT SRC" */

const images = [ //Se crea un arreglo de objetos con el nombre "images"
    {
        src: src1, //Corresponde a la ruta donde se encuentra la imagen.
        logo: "Half Life" //nombre de la imagen
    },
    {
        src: src1, //Esta es su duplicado para aplicarlo en el juego final.
        logo: "Half Life"
    },
    {
        src: src2,
        logo: "Konami"
    },
    {
        src: src2,
        logo: "Konami"
    },
    {
        src: src3,
        logo: "Mortal Kombat"
    },
    {
        src: src3,
        logo: "Mortal Kombat"
    },
    {
        src: src4,
        logo: "Naughty Dog"
    },
    {
        src: src4,
        logo: "Naughty Dog"
    },
    {
        src: src5,
        logo: "Super Mario"
    },
    {
        src: src5,
        logo: "Super Mario"
    },
    {
        src: src6,
        logo: "Valve"
    },
    {
        src: src6,
        logo: "Valve"
    },
];

export { images } //se exportan las imagenes.