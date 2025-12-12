import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Corbeille.css";
import {
  FaTrash,
  FaUndo,
  FaExclamationTriangle,
  FaTimes,
  FaArrowLeft,
} from "react-icons/fa";

export default function Corbeille() {
  const [deletedTasks, setDeletedTasks] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [searchTask,setSearchTask] = useState("")
  const SearchForTask = (event) =>{
     setSearchTask(event.target.value)

  }
  const navigate = useNavigate();

  // Load deleted tasks
  const loadDeleted = async () => {
    try {
      const res = await axios.get("http://localhost:3000/tasks");
      const removed = res.data.filter((t) => t.deleted === true);
      setDeletedTasks(removed);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadDeleted();
  }, []);

  // Restore a task
  const handleRestore = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/tasks/${id}`, {
        deleted: false,
        status: "To Do",
      });

      // Update UI
      setDeletedTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  // Open confirm popup
  const openConfirm = (task) => {
    setTaskToDelete(task);
    setConfirmOpen(true);
  };

  // Permanently delete
  const confirmPermanentDelete = async () => {
    if (!taskToDelete) return;

    try {
      await axios.delete(`http://localhost:3000/tasks/${taskToDelete.id}`);

      setDeletedTasks((prev) => prev.filter((t) => t.id !== taskToDelete.id));
      setConfirmOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="corbeille-body">


     <div class="centered-task">
       Task
     </div>
    <div className="basket-container">
      {/* Header: Return button left + Title center (optional) + Counter right */}
      <div className="basket-header">
        <button className="back-btn" onClick={() => navigate("/Home")}>
          <FaArrowLeft className="arrow" /> Back
        </button>

        
          <input type="text" placeholder="Search for a task" onChange={SearchForTask} className="search-input" />
          
      

        <div className="basket-counter">
             <span className="counter-badge" >{deletedTasks.length}</span>
          <p className="subtitle">Tasks</p>
       
        </div>
      </div>

      {deletedTasks.length === 0 ? (
        <p className="empty-text">No deleted tasks.</p>
      ) : (
        <div className="basket-list">
          {deletedTasks.filter((index)=>{
             if(searchTask === "")
              return true;
              return index.title.toLowerCase().includes(searchTask.toLowerCase())
             
          })
          
          
          
          
          .map((task) => (
            <div className="basket-card" key={task.id}>
              <div className="card-top">
                <h3>{task.title}</h3>
                <p className="priority">
                  Priorité : <span>{task.priority}</span>
                </p>
              </div>

              <div className="basket-actions">
                <button
                  className="restore-btn"
                  onClick={() => handleRestore(task.id)}
                >
                  <FaUndo /> Restore
                </button>

                <button
                  className="delete-forever-btn"
                  onClick={() => openConfirm(task)}
                >
                  <FaTrash /> Delete permanently
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirm Popup */}
      {confirmOpen && (
        <div className="confirm-popup">
          <div className="confirm-box">
            <FaExclamationTriangle className="warning-icon" />

            <h3>Supprimer définitivement</h3>
            <p>
              Êtes-vous sûr de vouloir supprimer la tâche "
              <span className="task-name">{taskToDelete?.title}</span>" ?
            </p>
            <p className="danger-text">Cette action est irréversible.</p>

            <div className="confirm-actions">
              <button
                className="cancel-btn"
                onClick={() => setConfirmOpen(false)}
              >
                <FaTimes /> Annuler
              </button>

              <button className="confirm-btn" onClick={confirmPermanentDelete}>
                <FaTrash /> Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
