import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Trash2,
  RotateCcw,
  AlertTriangle,
  Search,
  ArrowLeft,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from 'sonner';

export default function Corbeille() {
  const [deletedTasks, setDeletedTasks] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const loadDeleted = async () => {
    try {
      const res = await axios.get("http://localhost:3000/tasks");
      const removed = res.data.filter((t) => t.deleted === true);
      setDeletedTasks(removed);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadDeleted();
  }, []);

  const handleRestore = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/tasks/${id}`, {
        deleted: false,
        status: "To Do",
      });
      toast.success("Task restored");
      setDeletedTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      toast.error("Failed to restore task");
    }
  };

  const confirmPermanentDelete = async () => {
    if (!taskToDelete) return;
    try {
      await axios.delete(`http://localhost:3000/tasks/${taskToDelete.id}`);
      toast.success("Task permanently deleted");
      setDeletedTasks((prev) => prev.filter((t) => t.id !== taskToDelete.id));
      setConfirmOpen(false);
    } catch (err) {
      toast.error("Failed to delete task");
    }
  };

  const filteredTasks = deletedTasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/Home")}
            className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              Trash bin
              <span className="text-sm font-medium px-2 py-0.5 rounded-lg bg-red-400/10 text-red-400 border border-red-400/20">
                {deletedTasks.length}
              </span>
            </h1>
            <p className="text-slate-400 text-sm mt-1">Review and manage deleted tasks.</p>
          </div>
        </div>

        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-brand-cyan transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search in trash..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand-cyan/50 transition-all"
          />
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center p-20 glass-panel rounded-[2.5rem] text-center border-dashed border-2"
        >
          <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center text-slate-600 mb-6 font-bold text-4xl">
            ?
          </div>
          <h2 className="text-xl font-bold text-slate-300 mb-2">Trash is empty</h2>
          <p className="text-slate-500 max-w-xs">No tasks found in your trash bin. Deleted tasks will appear here.</p>
        </motion.div>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filteredTasks.map((task) => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="glass-card p-6 rounded-[2rem] flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-white/5 px-2 py-0.5 rounded-md border border-white/5">
                      {task.priority || 'medium'}
                    </span>
                    <Info size={14} className="text-slate-600 cursor-help" title={`Original status: ${task.status}`} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-200 mb-6 drop-shadow-sm line-clamp-2">
                    {task.title}
                  </h3>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleRestore(task.id)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20 font-bold text-sm hover:bg-brand-cyan/20 transition-all"
                  >
                    <RotateCcw size={16} /> Restore
                  </button>
                  <button
                    onClick={() => {
                      setTaskToDelete(task);
                      setConfirmOpen(true);
                    }}
                    className="p-3 rounded-xl bg-red-400/10 text-red-400 border border-red-400/20 hover:bg-red-400/20 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Permanent Delete Modal */}
      <AnimatePresence>
        {confirmOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setConfirmOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="relative w-full max-w-sm glass-panel p-8 rounded-[2.5rem] shadow-2xl border-red-500/20 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 mx-auto mb-6">
                <AlertTriangle size={32} />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Final Warning</h2>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                Are you sure you want to permanently delete "<span className="text-slate-200 font-medium">{taskToDelete?.title}</span>"? This cannot be undone.
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={confirmPermanentDelete}
                  className="w-full bg-red-500 text-white font-bold py-3.5 rounded-2xl shadow-xl hover:bg-red-600 transition-all"
                >
                  Delete Forever
                </button>
                <button
                  onClick={() => setConfirmOpen(false)}
                  className="w-full bg-white/5 text-slate-400 font-semibold py-3.5 rounded-2xl hover:bg-white/10 transition-all font-medium"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
