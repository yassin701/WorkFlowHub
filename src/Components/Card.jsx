import { useState } from 'react';
import './Card.css';
import Modifier from './Modifier';
import { Draggable } from '@hello-pangea/dnd';
import {FaTrash , FaPen  } from "react-icons/fa";



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
                    }`}
                              onClick={handleClick}>
                {task.title}

                <span>
                    <FaPen  className="editIcon"  />
                    {/* <FaTrash className="trashIcon"  /> */}

                </span>
              </p>
            </>
          )}
        </div>
      )}
    </Draggable>
  );
}

