import { useState } from "react";
import { FaExclamationTriangle, FaTimes } from 'react-icons/fa'
import axios from "axios";
import "./Delete.css";

export default function Delete({ task, onDeleted }) {
  const [open, setOpen] = useState(false);

  const handleConfirm = async () => {
    try {
      // Mark task as deleted WITHOUT removing it from db.json
      await axios.patch(`http://localhost:3000/tasks/${task.id}`, {
        deleted: true,
      });

      onDeleted(task.id); // parent (Card) updates UI
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <button className="btn-delete" onClick={() => setOpen(true)}>
        Delete
      </button>
      {open && (
        <div className="delete-popup">
          <div className="delete-box">

            <div className="warning-header">
              <FaExclamationTriangle className="warning-icon" />
              <h2 className="modal-title">Confirmer la suppression</h2>
            </div>

            <h6 className="delete-para">Are you sure you want to delete this task?</h6>
            <div className="delete-actions">
              <button onClick={handleConfirm} className="confirm-btn">
                Confirm
              </button>
              <button onClick={() => setOpen(false)} className="cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}