export default function Header({qs_rank,step,best,newGame}){

    return (
        <>
        <h1 id="title">Merging School</h1>
        <div className="btn-groups">
            <div className="qs-ranking" id="general-qs-ranking">QS: <p id="general-qs-ranking-value">{qs_rank}</p></div>
            <div className="qs-ranking" id="general-step">Step: <p id="general-step-value">{step}</p></div>
            <div className="qs-ranking" id="best-qs-ranking">Best: <p id="best-qs-ranking-value">{best}</p></div>
            <div className="button" id="reset-button" onClick={newGame}>New Game</div>
        </div>
        </>
    );
}