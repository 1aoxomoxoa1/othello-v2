import React from 'react';
import {useDraggable} from '@dnd-kit/core';
import '../../css/game/dnd.css'

function Draggable(props) {
    
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: `draggable-${props.idx}`,
  });

  //After a draggable item is picked up, the transform property will be populated with the translate coordinates 
  //you'll need to move the item on the screen.  
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  
  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes} className="drag-button">
      {props.children}
    </button>
  );
}

export default Draggable;