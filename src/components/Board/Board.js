import Square from "../Square/Square";
import './Board.css';
//creamos el tablero
const Board = ({squares, onClick, turn, winningSquares }) => {//recibe los cuadrados por parametro desde App, Onclick lo usamos en cada uno de los squares

    const createSquares = values => (
        values.map( value => (//recorre el array y devuelve esos mismos elementos modificados. Usamos el square.Cuando se trabaja con map se debe usar key a cada uno de los elementos que se crean. Asi es como react trackea en los distintos elementos y necesita esas keys. 1 Key unica para cada square 
            <Square
                winner={winningSquares.includes(value)}//para averiguar si un square es ganador o no, esto con el fin de animarlo. Si winningSquares incluye el mismo valor que esta en /values.map value =>/ 
                turn={turn}
                onClick={() => onClick(value)}//value es la posicion en la que esta el cuadrado
                value={squares[value]}
                key={`square_${value}`}
            />
        ))
    );

    return (//renderizamos
        <div className="board">
            <div className="row">
               {createSquares([0,1,2])}
            </div>
            <div className="row">
                {createSquares([3,4,5])}
            </div>
            <div className="row">
                {createSquares([6,7,8])}
            </div>
        </div>
    );
}

export default Board;