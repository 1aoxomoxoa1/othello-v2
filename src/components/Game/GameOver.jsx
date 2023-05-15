import '../../css/game/gameover.css'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { handlePlayAgain, handleBackToMenu } from '../../api/utilities/utilities';

function GameOver({score}){ 

    const navigate = useNavigate(); 

    return(
        <div className="game-over-ctr">
            <div> 
                <h1 className='header-ctr'> Game Over!</h1>
                <h1> Score: </h1>
                <h3> Black : {score['X'] === undefined ? '0' : score['X']} || White : {score['O'] === undefined ? '0' : score['O']}</h3>
                <div className='btn-ctr'> 
                    <Button className='over-btn' onClick={handlePlayAgain}> Play Again 
                    </Button> 
                </div>
                <div className='btn-ctr two'> 
                    <Button className='over-btn' onClick={() => handleBackToMenu(navigate)}> Return To Menu
                    </Button> 
                </div>
            </div>
        </div>
    )
}

export default GameOver;