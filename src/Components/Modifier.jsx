import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Type, AlignLeft, Flag, CheckCircle, Trash2 } from 'lucide-react';
import Delete from './Delete';

export default function Modifier({ onClose, task }) {
  const [updatedTask, setUpdatedTask] = useState({ ...task });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleChange = (e) => {
    setUpdatedTask({
      ...updatedTask,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      let finalTask = { ...updatedTask };

      // If status changed, move to the end of the new column
      if (updatedTask.status !== task.status) {
        const res = await axios.get('http://localhost:3000/tasks');
        const tasksInNewCol = res.data.filter(t => t.status === updatedTask.status && !t.deleted);
        finalTask.order = tasksInNewCol.length > 0
          ? Math.max(...tasksInNewCol.map(t => t.order || 0)) + 1
          : 0;
      }

      await axios.put(`http://localhost:3000/tasks/${task.id}`, finalTask);
      toast.success('Task updated');
      onClose();
    } catch (error) {
      console.error(error);
      toast.error('Update failed');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-lg glass-panel p-8 rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-cyan" />

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-indigo/10 flex items-center justify-center text-brand-indigo">
              <Save size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Edit Task</h2>
              <p className="text-xs text-slate-400">Update details for this item</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <Type size={14} className="text-brand-indigo" /> Title
            </label>
            <input
              onChange={handleChange}
              type="text"
              name='title'
              value={updatedTask.title}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white focus:outline-none focus:border-brand-indigo/50 transition-all font-medium"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <AlignLeft size={14} className="text-brand-indigo" /> Description
            </label>
            <textarea
              onChange={handleChange}
              name="description"
              value={updatedTask.description}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white focus:outline-none focus:border-brand-indigo/50 transition-all h-32 resize-none leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <Flag size={14} className="text-brand-indigo" /> Priority
              </label>
              <select
                onChange={handleChange}
                name='priority'
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white focus:outline-none focus:border-brand-indigo/50 appearance-none cursor-pointer"
                value={updatedTask.priority}
              >
                <option value="high" className="bg-[#0a0a0a]">High</option>
                <option value="medium" className="bg-[#0a0a0a]">Medium</option>
                <option value="low" className="bg-[#0a0a0a]">Low</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <CheckCircle size={14} className="text-brand-indigo" /> Status
              </label>
              <select
                onChange={handleChange}
                name='status'
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white focus:outline-none focus:border-brand-indigo/50 appearance-none cursor-pointer"
                value={updatedTask.status}
              >
                <option value="To Do" className="bg-[#0a0a0a]">To Do</option>
                <option value="In Progress" className="bg-[#0a0a0a]">In Progress</option>
                <option value="Done" className="bg-[#0a0a0a]">Done</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              className="flex-1 bg-brand-indigo text-white font-bold py-4 rounded-2xl shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all"
              onClick={handleUpdate}
            >
              Save Changes
            </button>
            <button
              className="px-6 rounded-2xl bg-white/5 border border-white/10 text-red-400 hover:bg-red-400/10 hover:border-red-400/20 transition-all group"
              onClick={() => setShowDeleteConfirm(true)}
            >
              <Trash2 size={20} className="group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showDeleteConfirm && (
          <Delete
            task={task}
            onDeleted={() => onClose()}
            onCancel={() => setShowDeleteConfirm(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
