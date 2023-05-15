import '../../css/game/game.css';
import '../../css/game/square.css'
import { useEffect, useState } from 'react';
import WhiteChip from '../../images/white-chip.png';
import BlackChip from '../../images/black-chip.png';
import WhiteChipTrans from '../../images/white-chip-trans.png'
import BlackChipTrans from '../../images/black-chip-trans.png'
import WhiteChipLastMove from '../../images/white-chip-lastmove.png'
import Draggable from '../Dnd/Draggable';
import Droppable from '../Dnd/Droppable';
import { squareClicked } from '../../api/utilities/utilities';

function Square({square, turnState, setTurnState, setErrMessageClass, setErrMessage, myController}){


        let dragIdx; 
        let chipImage;
        if(square.value === 'X'){
            chipImage = BlackChip
            dragIdx = `${square.idx}-black`
        }else if(square.value === 'O'){
            chipImage = WhiteChip
            dragIdx = `${square.idx}-white`
        }else if(square.value === 'X-marker'){
            chipImage = BlackChipTrans
        }else if(square.value === 'O-marker'){
            chipImage = WhiteChipTrans
        }else if(square.value === 'O-lastmove'){
            chipImage = WhiteChipLastMove;
        }
        else{
            chipImage = ''
            dragIdx = '';
        }

        let dropIdx = square.idx



    return(
        <div className={`square ${square.idx}`} onClick={(event) =>
            squareClicked(event, turnState, setTurnState, setErrMessageClass, setErrMessage, myController)}> 
            
            { chipImage === '' //in the case where there is an EMPTY SQUARE
            ? <Droppable idx={dropIdx}  className='piece-empty-sqaure'> 
                <div className={`empty-square ${square.idx}`} alt={`empty-square-${square.idx}`}>
                </div>
            </Droppable>
            : <>
                {chipImage === BlackChip || chipImage === WhiteChip
                ? <Droppable idx={dropIdx}>  
                    <Draggable idx={dragIdx}> 
                        <div className='img-ctr-flex'> <img src={chipImage}  alt={`chip-img`} className={`chip-img ${square.idx}`}/> </div>
                    </Draggable>      
                  </Droppable> 

                //  below this will be the transparent icon images
                : <Droppable idx={dropIdx}> 
                    <div className='img-ctr-flex'> <img src={chipImage} alt={`chip-img`} className={`chip-img ${square.idx}`}/> </div>
                  </Droppable>
                }
                </>
            
            
            
            }
        </div>
    )
}


export default Square;