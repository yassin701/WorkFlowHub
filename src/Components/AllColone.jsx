import { useEffect, useState } from "react";
import axios from "axios";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import Card from "./Card";
import { motion, AnimatePresence } from "framer-motion";
import { Circle, Clock, CheckCircle2 } from "lucide-react";

export default function AllColone({ reload, onEdit }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/tasks")
      .then((res) => setTasks(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [reload]);

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) return;

    const newTasks = Array.from(tasks);
    let movedTask = null;

    if (source.droppableId === destination.droppableId) {
      const columnTasks = newTasks
        .filter((t) => t.status === source.droppableId)
        .sort((a, b) => a.order - b.order);

      const [removed] = columnTasks.splice(source.index, 1);
      columnTasks.splice(destination.index, 0, removed);

      columnTasks.forEach((task, index) => (task.order = index));

      const otherTasks = newTasks.filter((t) => t.status !== source.droppableId);
      const updatedTasks = [...otherTasks, ...columnTasks];
      setTasks(updatedTasks);

      columnTasks.forEach((task) =>
        axios.put(`http://localhost:3000/tasks/${task.id}`, task)
      );
    } else {
      const taskIndex = newTasks.findIndex((t) => t.id.toString() === draggableId);
      const [task] = newTasks.splice(taskIndex, 1);

      task.status = destination.droppableId;

      const destTasks = newTasks
        .filter((t) => t.status === destination.droppableId)
        .sort((a, b) => a.order - b.order);

      destTasks.splice(destination.index, 0, task);
      destTasks.forEach((t, index) => (t.order = index));

      const otherTasks = newTasks.filter((t) => t.status !== destination.droppableId);
      const updatedTasks = [...otherTasks, ...destTasks];
      setTasks(updatedTasks);

      destTasks.forEach((t) =>
        axios.put(`http://localhost:3000/tasks/${t.id}`, t)
      );
    }
  };

  const columns = [
    { id: "To Do", title: "To Do", icon: Circle, color: "text-slate-400" },
    { id: "In Progress", title: "In Progress", icon: Clock, color: "text-brand-indigo" },
    { id: "Done", title: "Done", icon: CheckCircle2, color: "text-brand-cyan" }
  ];

  return (
    <div className="h-full">
      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="w-10 h-10 border-4 border-brand-cyan/30 border-t-brand-cyan rounded-full animate-spin"></div>
        </div>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex gap-6 h-full items-start overflow-x-auto pb-6">
            {columns.map((column) => (
              <div key={column.id} className="flex-1 min-w-[320px] max-w-[400px]">
                <div className="flex items-center justify-between mb-6 px-2">
                  <div className="flex items-center gap-3">
                    <column.icon className={`w-5 h-5 ${column.color}`} />
                    <h2 className="text-lg font-bold text-slate-200">
                      {column.title}
                    </h2>
                    <span className="px-2 py-0.5 rounded-md bg-white/5 text-xs text-slate-500 font-medium">
                      {tasks.filter(t => t.status === column.id && !t.deleted).length}
                    </span>
                  </div>
                </div>

                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`
                        min-h-[500px] rounded-2xl p-2 transition-colors duration-200
                        ${snapshot.isDraggingOver ? 'bg-white/[0.02]' : 'bg-transparent'}
                      `}
                    >
                      <AnimatePresence>
                        {tasks
                          .filter((t) => t.status === column.id && !t.deleted)
                          .sort((a, b) => a.order - b.order)
                          .map((task, index) => (
                            <Card
                              key={task.id}
                              task={task}
                              index={index}
                              onEdit={onEdit}
                            />
                          ))}
                      </AnimatePresence>
                      {provided.placeholder}

                      {tasks.filter((t) => t.status === column.id && !t.deleted).length === 0 && !snapshot.isDraggingOver && (
                        <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-white/5 rounded-2xl">
                          <p className="text-sm text-slate-600">No tasks here</p>
                        </div>
                      )}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      )}
    </div>
  );
}
