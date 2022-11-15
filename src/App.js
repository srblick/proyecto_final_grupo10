import { useState } from 'react';
import './App.css';
import Board from './components/Board/Board';
import ScoreBoard from './components/ScoreBoard/ScoreBoard';
import Volver from './components/Volver';

const winningPositions = [//condiciones posibles ganadoras
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];


const App = () => {

  const [turn, setTurn] = useState('X');//de quien es el turno
  const [squares, setSquares] = useState(Array(9).fill(null));//cuadraditos del tablero. Cuando se inicia la app todos valores estan nulos(vacios)
  const [winningSquares, setWinningSquares] = useState([]);//para guardar la posicion ganadora
  const [score, setScore] = useState({ //aca guardamos el score de los jugadores
    X: 0,
    O: 0,
  });

  const reset = () => { //no recibe parametros
    setTurn('X');//vuelve a empezar la X
    setSquares(Array(9).fill(null));//colocamos todos los squares en vacios
    setWinningSquares([]);//reseteamos los WinningSquares porque no hay squares ganadores a un array vacio
  }

  const checkForWinner = newSquares => {
    for(let i = 0; i < winningPositions.length; i++) {//mientras i sea menor a winningPositions...
      const [a,b,c] = winningPositions[i];//vamos a guardar en 3 variables distintas cada vez que recibamos cada uno de los bloques de winningPositions
      if(newSquares[a] && newSquares[a] === newSquares[b] && newSquares[a] === newSquares[c]) {//si valor A es distinto de nulo y valor A es igual a B y valor A es igual a C entonces hay un ganador, esto lo vamos a hacer por cada una de las combinaciones
        endGame(newSquares[a], winningPositions[i]);//le pasamos el valor ganador X o O y como segundo parametro le pasamos la posicion ganadora
        return
      }
    }

    if(!newSquares.includes(null)) {//si todos los cuadrados tienen algun valor y checkeamos que no hay un ganador entonces hay un empate
      endGame(null, Array.from(Array(10).keys()));//como no hubo ganador le pasamos un Null y como winningPosition le pasamos un Array.from de 10 elementos junto a sus keys para animar todos los casilleros
      return
    }
    setTurn(turn === 'X' ? 'O' : 'X');
  }

  const handleClick = square => {//dibujar cada vez que se haga click
    let newSquares = [...squares];//copia de los squares
    newSquares.splice(square, 1, turn);//recibe un numero de 0 a 8 como posicion,por ejemplo en la posicion 4 modifica un elemnto y dale el valor de turn para que haga un circulo o equis 
    setSquares(newSquares);//seteamos los squares creados con los squares originales
    checkForWinner(newSquares);//le pasamos los newsquares para comprobar si tienen algun ganador
  }

  const endGame = (result, winningPositions) => {//recibe un resultado y la posicion ganadora
    setTurn(null);//bloqueamos los clicks del usuario
    if(result !== null) {//si no hubo un empate le sumamos puntos a quien corresponda
      setScore({
        ...score,//no se modifica el estado score directamente y para eso lo desestructuramos, despues modificamos el score de X o O
        [result]: score[result] + 1,//result es el valor que representa la X o O del ganador
      })
    }
    setWinningSquares(winningPositions);//envaimos los squares ganadores por parametro a WinningSquares
    setTimeout(reset, 2000);//esperamos un poco antes del reset para llegar a ver las animaciones
  }

  return (//renderizamos nuestro board, le enviamos los squares
  //a Board le pasamos las winningSquares, turnos, y la funcion handleClick que es dibujar sobre los squares
  //Score le pasamos la puntuacion de O y X
    <div className="container">
      <Board winningSquares={winningSquares} turn={turn} squares={squares} onClick={handleClick}/>
      <ScoreBoard scoreO={score.O} scoreX={score.X} />
      <footer>
                <Volver/>
      </footer>
    </div>
  );
}

export default App;
