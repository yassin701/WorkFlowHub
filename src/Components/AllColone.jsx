import './AllColone.css';
import Card from './Card';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

export default function AllClone({reload}) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    axios.get('http://localhost:3000/tasks')
      .then(res => setTasks(res.data))
      .catch(err => console.log(err))
      .finally(()=>setLoading(false));
  }, [reload]);



const handleDragEnd = (result) => {
  console.log(result);

  const { source, destination, draggableId } = result;
  if (!destination) return;

  const newTasks = Array.from(tasks);
  let movedTask = null;

  // --- SAME COLUMN ---
  if (source.droppableId === destination.droppableId) {
    const columnTasks = newTasks
      .filter(t => t.status === source.droppableId)
      .sort((a, b) => a.order - b.order);

    // Remove the dragged task and insert at new position
    const [removed] = columnTasks.splice(source.index, 1);
    columnTasks.splice(destination.index, 0, removed);
    movedTask = removed;

    // Update order for all tasks in this column
    columnTasks.forEach((task, index) => task.order = index);

    const otherTasks = newTasks.filter(t => t.status !== source.droppableId);
    setTasks([...otherTasks, ...columnTasks]);

    // Update backend for all tasks in this column
    columnTasks.forEach(task =>
      axios.put(
        `http://localhost:3000/tasks/${task.id}`,
        task,
        { headers: { "Content-Type": "application/json" } }
      )
    );
  }

  // --- DIFFERENT COLUMN ---
  else {
    const taskIndex = newTasks.findIndex(t => t.id.toString() === draggableId);
    const [task] = newTasks.splice(taskIndex, 1);

    task.status = destination.droppableId;
    movedTask = task;

    const destTasks = newTasks
      .filter(t => t.status === destination.droppableId)
      .sort((a, b) => a.order - b.order);

    destTasks.splice(destination.index, 0, task);

    // Update order in destination column
    destTasks.forEach((t, index) => t.order = index);

    const otherTasks = newTasks.filter(t => t.status !== destination.droppableId);

    setTasks([...otherTasks, ...destTasks]);

    // Update backend for all tasks in destination column
    destTasks.forEach(t =>
      axios.put(
        `http://localhost:3000/tasks/${t.id}`,
        t,
        { headers: { "Content-Type": "application/json" } }
      )
    );
  }
};




const toDo = tasks.filter(t => t.status === "To Do")
            .sort((a, b) => a.order - b.order);
const inProgress = tasks.filter(t => t.status === "In Progress")
                  .sort((a, b) => a.order - b.order);
const done = tasks.filter(t => t.status === "Done")
            .sort((a, b) => a.order - b.order);





  return (
    <>
        {
            loading ?(
                <div className='loading'></div>
            )
            :
                <DragDropContext onDragEnd={handleDragEnd}>
                    <section className='AllColumns'>

                        {/* TO DO */}
                        <Droppable droppableId="To Do">
                        {(provided) => (
                            <div className='Column' ref={provided.innerRef} {...provided.droppableProps}>
                            <div className="toDo">
                                <h2>To Do</h2>
                                <p>{toDo.length > 0 ? '+' : ''}{toDo.length}</p>
                            </div>
                            <div className="siperate"></div>
                            <div className="cards">
                                {toDo.length > 0 ? toDo.map((task, index) => (
                                <Card key={task.id} task={task} index={index} />
                                )) : <p>No task</p>}
                                {provided.placeholder}
                            </div>
                            </div>
                        )}
                        </Droppable>

                        {/* IN PROGRESS */}
                        <Droppable droppableId="In Progress">
                        {(provided) => (
                            <div className='Column' ref={provided.innerRef} {...provided.droppableProps}>
                            <div className="Progress">
                                <h2>In Progress</h2>
                                <p>{inProgress.length > 0 ? '+' : ''}{inProgress.length}</p>
                            </div>
                            <div className="siperate"></div>
                            <div className="cards">
                                {inProgress.length > 0 ? inProgress.map((task, index) => (
                                <Card key={task.id} task={task} index={index} />
                                )) : <p>No task</p>}
                                {provided.placeholder}
                            </div>
                            </div>
                        )}
                        </Droppable>

                        {/* DONE */}
                        <Droppable droppableId="Done">
                        {(provided) => (
                            <div className='Column' ref={provided.innerRef} {...provided.droppableProps}>
                            <div className="Done">
                                <h2>Done</h2>
                                <p>{done.length > 0 ? '+' : ''}{done.length}</p>
                            </div>
                            <div className="siperate"></div>
                            <div className="cards">
                                {done.length > 0 ? done.map((task, index) => (
                                <Card key={task.id} task={task} index={index} />
                                )) : <p>No task</p>}
                                {provided.placeholder}
                            </div>
                            </div>
                        )}
                        </Droppable>

                    </section>
                </DragDropContext>
        }
        
    </>
  );
}
