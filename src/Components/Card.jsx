import { useState } from 'react';
import './Card.css';
import Modifier from './Modifier';
import { Draggable } from '@hello-pangea/dnd';



export default function Card({ task, index, onEdit }) {
  const [showEditPopUp, setShowEditPopUp] = useState(false);

  const handleClick = () => {
   if(onEdit) onEdit(task);
  };

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          
            <>
              <p 
                  className={`Card ${
                      task.priority === 'high'
                        ? 'high'
                        : task.priority === 'low'
                        ? 'low'
                        : 'medium'
                      }
                      ${task.status==='Done'?'DoneCard':''}`
                  }
                              onClick={handleClick}>
                {task.title}

               
              </p>
            </>
          
        </div>
      )}
    </Draggable>
  );
}

