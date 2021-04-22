import Row from './Row'

export default function Board2048 ({ board , gameover,tryAgain}) {

    let boardClassName = "board";
    let infoClassName = "info";
    let outSentence = "No funding this year QAO";
    let phdSentence = "You should study a PhD!";
    let pointer = "none";
    let opcity= "0%";
    if (gameover==true){
        boardClassName = "game-over-board"
        pointer = "auto";
        opcity="100%";
    }
    
    return (
        <>
        <table className={boardClassName} id="board-full">
            <tbody>
                {board.map((row_vector, row_idx) => (<Row key={row_idx} row_array={row_vector}/>))}
            </tbody>
        </table>
        <div className={infoClassName} style={{opacity:opcity}} id="game-over-info">
            <span id="game-over-text">{outSentence}</span>
            <div className="button" id="game-over-button" style ={{pointerEvents:pointer}} onClick={tryAgain}>Try again</div>
        </div>
        </>
    );
};