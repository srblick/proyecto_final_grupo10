import './ScoreBoard.css';

const ScoreBoard = ({scoreX, scoreO}) => (//recibe el puntaje de O y X para mostrarlos 
    <div className="score-board">
        <div>{scoreX}</div>
        <div>{scoreO}</div>
    </div>
    
)

export default ScoreBoard;