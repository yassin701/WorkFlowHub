import { useState } from "react";
import "./Card.css";
import Modifier from "./Modifier";
import { Draggable } from "@hello-pangea/dnd";

//------------------------
// 2. Impot Delete
import Delete from "./Delete";
//------------------------



export default function Card({ task, index, onEdit }) {
  const [showEditPopUp, setShowEditPopUp] = useState(false);

//------------------------
  // 3. Add isDeleted state
  const [isDeleted, setIsDeleted] = useState(false);
//------------------------

  const handleClick = () => {
   if(onEdit) onEdit(task);
  };

    if (isDeleted) return null;

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
            //---------------------------------------------------
            // 4. Add Delete component and wrap Card in a div
            <div className="card-with-delete">
              <p
                className={`Card ${
                  task.priority === "high"
                    ? "high"
                    : task.priority === "low"
                    ? "low"
                    : "medium"
                }`}
                onClick={handleClick}
              >
                {task.title}
              </p>
              <Delete task={task} onDeleted={() => setIsDeleted(true)} />
            </div>
            //---------------------------------------------------
          )}
        </div>
      )}
    </Draggable>
  );
}
