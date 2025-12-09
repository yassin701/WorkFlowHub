import React from 'react'
import { useState } from 'react'
import './Ajouter.css'
import { toast } from 'sonner'
import axios from 'axios'
export default function Ajouter({ onClose }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "high",
    status: "To Do"
  })

  const HandleChange = (e) => {
    setTask((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }
  const [TitreErr, setTitreErr] = useState('')
  const [DesErr, setDesErr] = useState('')
  const [PriorityErr, setPriorityErr] = useState('')
  const [StatusErr, setStatusErr] = useState('')
  const [error, setError] = useState(false)

  const AddTask = () => {
    let validate = true

    if (!task.title.trim()) {
      setError(true)
      setTitreErr("title is required")
      validate = false
    }
    if (!task.description.trim()) {
      setError(true)
      setDesErr("description is required")
      validate = false
    }
    if (!task.priority.trim()) {
      setError(true)
      setPriorityErr("priority is required")
      validate = false
    }
    if (!task.status.trim()) {
      setError(true)
      setStatusErr("status is required")
      validate = false
    }
    if (validate) {
      axios.post('http://localhost:3000/tasks', task)
        .then((res) => {
          console.log(res.data);
          setTask({
            title: "",
            description: "",
            priority: "high",
            status: "To Do"
          });
        })
        .catch((err) => {
          console.log(err);
        });
      toast.success('Task added successfully!');
      setError(false)
      setTitreErr('')
      setDesErr('')
      setPriorityErr('')
      setStatusErr('')
      onClose()

    }
  }




  return (
    <div className="ajouter-container">
      <button
        className="close-btn"
        onClick={onClose} // 👈 ici on ferme le popup
      >
        X
      </button>
      <label className="ajouter-label">Title</label>
      <input onChange={HandleChange} type="text" name='title' value={task.title} className="ajouter-input" />
      {error && <p>{TitreErr}</p>}


      <label className="ajouter-label">Descriptions</label>
      <textarea onChange={HandleChange} type="text" name='description' value={task.description} className="ajouter-input" />
      {error && <p>{DesErr}</p>}
      <label className="ajouter-label">Priority</label>
      <select onChange={HandleChange} name='priority' className="ajouter-select" value={task.priority}>
        <option value="Urgent">High</option>
        <option value="moyen">Medium</option>
        <option value="Low">Low</option>
      </select>

      {error && <p>{PriorityErr}</p>}

      <label className="ajouter-label">Status</label>
      <select onChange={HandleChange} name='status' className="ajouter-select" value={task.status}>
        <option value="To Do">To Do</option>
        <option value="En Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      {error && <p>{StatusErr}</p>}

      <button className="btn-ajouter" onClick={AddTask}>Add Task</button>
    </div>
  )
}
