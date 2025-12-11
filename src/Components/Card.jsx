import { useState } from 'react';
import './Card.css';
import Modifier from './Modifier';
import { Draggable } from '@hello-pangea/dnd';



export default function Card({ task, index }) {
  const [showEditPopUp, setShowEditPopUp] = useState(false);

  const handleClick = () => {
    setShowEditPopUp(true);
  };

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {showEditPopUp ? (
            <Modifier />
          ) : (
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
                <span  
                    className={`${
                      task.priority === 'high'
                        ? 'highPriority'
                        : task.priority === 'low'
                        ? 'lowPriority'
                        : 'mediumPriority'
                      }`
                    }>
                  {task.priority}
                </span>

                
              </p>
            </>
          )}
        </div>
      )}
    </Draggable>
  );
}

