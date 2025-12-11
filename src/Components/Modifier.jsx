import React from 'react'
import { useState } from "react";
import axios from "axios";
import Delete from './Delete';
import "./Ajouter.css"; 
import "./Modifier.css"
export default function Modifier({ onClose, task }) {

  const [updatedTask, setUpdatedTask] = useState({ ...task });
  const [isDeleted, setIsDeleted] = useState(false);
  const handleChange = (e) => {
    setUpdatedTask({
      ...updatedTask,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = () => {
    axios
      .put(`http://localhost:3000/tasks/${task.id}`, updatedTask)
      .then(() => {
        onClose();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="overlay"></div>

      <div className="ajouter-container">
        <button className="close-btn" onClick={onClose}>X</button>

        <label className="ajouter-label">Title</label>
        <input
          type="text"
          name="title"
          value={updatedTask.title}
          onChange={handleChange}
          className="ajouter-input"
        />

        <label className="ajouter-label">Description</label>
        <textarea
          name="description"
          value={updatedTask.description}
          onChange={handleChange}
          className="ajouter-textarea"
        ></textarea>

        <label className="ajouter-label">Priority</label>
        <select
          name="priority"
          value={updatedTask.priority}
          onChange={handleChange}
          className="ajouter-select"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <label className="ajouter-label">Status</label>
        <select
          name="status"
          value={updatedTask.status}
          onChange={handleChange}
          className="ajouter-select"
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>

        <div className="buttons-container">
          <button className="btn-update" onClick={handleUpdate}>
            Update
          </button>
          {/* Pass isDeleted state to Delete component and forward onClose so Modifier modal closes on delete */}
          <Delete task={task} onDeleted={() => setIsDeleted(true)} onClose={onClose} />

        </div>
     
      </div>
    </>
  );
}

