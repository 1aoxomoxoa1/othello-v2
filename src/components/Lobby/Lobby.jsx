import GameForm from "./GameForm"
import '../../css/lobby/lobby.css'
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Lobby(){

    const navigate = useNavigate()

    useEffect( () => {
        if(sessionStorage.getItem('playagain') === 'yes'){
            console.log('we are playing agin')
            sessionStorage.removeItem('playagain');
            navigate('/game');
        }
    }, [])

    return(
        <main>
            <div className="form-div">
                <GameForm> </GameForm>
            </div>
        </main>
    )
}

export default Lobby