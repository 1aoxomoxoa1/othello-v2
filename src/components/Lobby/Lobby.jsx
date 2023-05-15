import GameForm from "./GameForm"
import '../../css/lobby/lobby.css'

function Lobby(){
    return(
        <main>
            <div className="form-div">
                <GameForm> </GameForm>
            </div>
        </main>
    )
}

export default Lobby