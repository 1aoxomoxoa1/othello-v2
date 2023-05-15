import '../../css/game/game.css'

function GameRow({row}){

    console.log(row);

    return(
        <div className="game-row">
            {row.map(square => 
                <div className="square"> </div>
            )
            }
        </div>
    )
}

export default GameRow;