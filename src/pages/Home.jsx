import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {
  Plus,
  LayoutDashboard,
  CheckCircle2,
  Clock,
  Circle,
  TrendingUp,
  ArrowRight
} from "lucide-react";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [stats, setStats] = useState({
    todo: 0,
    progress: 0,
    done: 0,
    total: 0
  });
  const [recentTasks, setRecentTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/tasks')
      .then(res => {
        const all = res.data.filter(t => !t.deleted);
        const todo = all.filter(t => t.status === 'To Do').length;
        const progress = all.filter(t => t.status === 'In Progress').length;
        const done = all.filter(t => t.status === 'Done').length;

        setStats({ todo, progress, done, total: all.length });

        // Get 4 most recent tasks (assuming createdAt exists or just the last ones in array)
        const recent = [...all].reverse().slice(0, 4);
        setRecentTasks(recent);
      })
      .catch(err => console.error(err));
  }, []);

  const completionRate = stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0;

  const statCards = [
    { label: 'To Do', value: stats.todo, icon: Circle, color: 'text-slate-400', bg: 'bg-slate-400/10' },
    { label: 'In Progress', value: stats.progress, icon: Clock, color: 'text-brand-indigo', bg: 'bg-brand-indigo/10' },
    { label: 'Completed', value: stats.done, icon: CheckCircle2, color: 'text-brand-cyan', bg: 'bg-brand-cyan/10' }
  ];

  return (
    <div className="max-w-[1400px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-3xl font-bold text-white mb-2">Workspace Overview</h1>
        <p className="text-slate-400 text-sm">Track your team's productivity and recent updates.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {/* Main Stats Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 glass-panel p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/10 blur-3xl rounded-full -mr-16 -mt-16" />

          <div className="relative">
            <div className="w-32 h-32 rounded-full border-8 border-white/5 flex items-center justify-center relative">
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="64" cy="64" r="56"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-brand-cyan/20"
                />
                <circle
                  cx="64" cy="64" r="56"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray={351.8}
                  strokeDashoffset={351.8 - (351.8 * completionRate) / 100}
                  strokeLinecap="round"
                  className="text-brand-cyan transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="text-center">
                <span className="text-3xl font-black text-white">{completionRate}%</span>
              </div>
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-white mb-2 italic">Productivity Pulse</h2>
            <p className="text-slate-400 text-sm mb-6 max-w-sm">
              You've completed {stats.done} out of {stats.total} tasks. Keep the momentum going to reach your weekly goal!
            </p>
            <button
              onClick={() => navigate('/Tasks')}
              className="group flex items-center gap-2 text-brand-cyan font-bold text-sm hover:translate-x-1 transition-all"
            >
              Go to Kanban Board <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>

        {/* Quick Actions / Today's Focus */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-panel p-8 rounded-[2.5rem] bg-brand-indigo/5 border-brand-indigo/10 flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-brand-indigo/20 flex items-center justify-center text-brand-indigo mb-6">
              <TrendingUp size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Add New Insight</h3>
            <p className="text-slate-400 text-sm mb-6">Capture new ideas or tasks as they come to your mind.</p>
          </div>
          <button
            onClick={() => navigate('/Tasks')}
            className="w-full bg-brand-indigo text-white font-bold py-4 rounded-2xl shadow-lg hover:scale-[1.02] transition-all"
          >
            Create Task
          </button>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {statCards.map((card, idx) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + (idx * 0.1) }}
            className="glass-card p-6 rounded-3xl flex items-center gap-5"
          >
            <div className={`w-14 h-14 rounded-2xl ${card.bg} flex items-center justify-center ${card.color}`}>
              <card.icon size={28} />
            </div>
            <div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{card.label}</p>
              <p className="text-2xl font-black text-white">{card.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-panel p-8 rounded-[2.5rem]"
      >
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-bold text-white">Recent Activity</h3>
          <button
            onClick={() => navigate('/Tasks')}
            className="text-slate-400 hover:text-white transition-colors text-sm font-medium"
          >
            View all tasks
          </button>
        </div>

        <div className="space-y-4">
          {recentTasks.length === 0 ? (
            <p className="text-slate-600 text-center py-10">No recent activity found.</p>
          ) : (
            recentTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/5 transition-colors cursor-pointer" onClick={() => navigate('/Tasks')}>
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${task.status === 'Done' ? 'bg-brand-cyan shadow-[0_0_10px_rgba(34,211,238,0.5)]' : 'bg-slate-700'}`} />
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200">{task.title}</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5 uppercase tracking-tight">{task.status}</p>
                  </div>
                </div>
                <div className="text-[10px] font-bold text-slate-500 bg-white/5 px-2 py-1 rounded-md border border-white/5">
                  {task.priority.toUpperCase()}
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
}
