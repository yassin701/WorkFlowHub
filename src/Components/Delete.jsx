import React from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { AlertTriangle, Trash2, X } from "lucide-react";
import { toast } from 'sonner';

export default function Delete({ task, onDeleted, onCancel }) {
  const handleConfirm = async () => {
    try {
      await axios.patch(`http://localhost:3000/tasks/${task.id}`, {
        deleted: true,
      });
      toast.success("Task moved to trash");
      onDeleted(task.id);
    } catch (err) {
      toast.error("Failed to delete task");
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onCancel}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-sm glass-panel p-8 rounded-3xl shadow-2xl border-red-500/20"
      >
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-red-400/10 flex items-center justify-center text-red-400 mb-6">
            <AlertTriangle size={32} />
          </div>

          <h2 className="text-xl font-bold text-white mb-2">Delete Task?</h2>
          <p className="text-slate-400 text-sm mb-8 leading-relaxed">
            This will move "<span className="text-slate-200 font-medium">{task.title}</span>" to the trash. You can restore it later if needed.
          </p>

          <div className="flex flex-col w-full gap-3">
            <button
              onClick={handleConfirm}
              className="w-full bg-red-500 text-white font-bold py-3.5 rounded-2xl shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:bg-red-600 transition-all flex items-center justify-center gap-2"
            >
              <Trash2 size={18} />
              Confirm Delete
            </button>
            <button
              onClick={onCancel}
              className="w-full bg-white/5 text-slate-300 font-semibold py-3.5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>

        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/5 text-slate-500 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>
      </motion.div>
    </div>
  );
}