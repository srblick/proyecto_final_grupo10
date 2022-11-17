import './Square.css';
import classNames from 'classnames';

const Square = ({ value, onClick, turn, winner }) => {

    const handleClick = () => {
        (turn !== null && value === null) && onClick();//si value es == null para comprobar sino tiene nada para realizar la accion onClick y que turn tenga asignado un turno 
    }

    let squareClass = classNames({
        square: true,//siempre queremos que tenga la clase square
        [`square--${value}`]: value !== null,// agregamos un value que representa X o O y solamente queremos que se agregue esta clase si value es distinto de null
        winner: winner,//agregamos la clase winner solo si nuestro square es winner. Tenemos todo para saber si nuestro square es ganador o no
    });

    return (//renderizamos
        <div className={squareClass} onClick={() => handleClick()}>

        </div>
    )
}

export default Square;