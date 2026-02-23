import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Type, AlignLeft, Flag, CheckCircle } from 'lucide-react';

export default function Ajouter({ onClose }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "high",
    status: "To Do"
  });

  const [errors, setErrors] = useState({});

  const HandleChange = (e) => {
    setTask((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!task.title.trim()) newErrors.title = "Title is required";
    if (!task.description.trim()) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const AddTask = async () => {
    if (validate()) {
      try {
        // Fetch current tasks to calculate next order index
        const res = await axios.get('http://localhost:3000/tasks');
        const tasksInCol = res.data.filter(t => t.status === task.status && !t.deleted);
        const nextOrder = tasksInCol.length > 0
          ? Math.max(...tasksInCol.map(t => t.order || 0)) + 1
          : 0;

        const payload = {
          ...task,
          order: nextOrder,
          deleted: false,
          createdAt: new Date().toISOString()
        };

        await axios.post('http://localhost:3000/tasks', payload);
        toast.success('Task created successfully');
        onClose();
      } catch (error) {
        console.error(error);
        toast.error('Failed to create task. Is the server running?');
      }
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
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-cyan via-brand-indigo to-brand-violet" />

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan">
              <Plus size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">New Task</h2>
              <p className="text-xs text-slate-400">Add a new item to your workspace</p>
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
              <Type size={14} className="text-brand-cyan" /> Title
            </label>
            <input
              onChange={HandleChange}
              type="text"
              name='title'
              value={task.title}
              className={`w-full bg-white/5 border ${errors.title ? 'border-red-500/50' : 'border-white/10'} rounded-2xl py-3 px-4 text-white focus:outline-none focus:border-brand-cyan/50 transition-all`}
              placeholder='e.g., Design System Overhaul'
            />
            {errors.title && <p className="text-xs text-red-400 pt-1 pl-1">{errors.title}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <AlignLeft size={14} className="text-brand-cyan" /> Description
            </label>
            <textarea
              onChange={HandleChange}
              name="description"
              value={task.description}
              className={`w-full bg-white/5 border ${errors.description ? 'border-red-500/50' : 'border-white/10'} rounded-2xl py-3 px-4 text-white focus:outline-none focus:border-brand-cyan/50 transition-all h-32 resize-none`}
              placeholder="What needs to be done?"
            />
            {errors.description && <p className="text-xs text-red-400 pt-1 pl-1">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <Flag size={14} className="text-brand-cyan" /> Priority
              </label>
              <select
                onChange={HandleChange}
                name='priority'
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white focus:outline-none focus:border-brand-cyan/50 appearance-none"
                value={task.priority}
              >
                <option value="high" className="bg-[#0a0a0a]">High</option>
                <option value="medium" className="bg-[#0a0a0a]">Medium</option>
                <option value="low" className="bg-[#0a0a0a]">Low</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <CheckCircle size={14} className="text-brand-cyan" /> Status
              </label>
              <select
                onChange={HandleChange}
                name='status'
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white focus:outline-none focus:border-brand-cyan/50 appearance-none"
                value={task.status}
              >
                <option value="To Do" className="bg-[#0a0a0a]">To Do</option>
                <option value="In Progress" className="bg-[#0a0a0a]">In Progress</option>
                <option value="Done" className="bg-[#0a0a0a]">Done</option>
              </select>
            </div>
          </div>

          <button
            className="w-full bg-brand-cyan text-black font-bold py-4 rounded-2xl shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all mt-4"
            onClick={AddTask}
          >
            Create Task
          </button>
        </div>
      </motion.div>
    </div>
  );
}
