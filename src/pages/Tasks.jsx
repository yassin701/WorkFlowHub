import React, { useState } from 'react'
import { Plus, Bell, Calendar as CalendarIcon, Filter } from "lucide-react";
import Ajouter from '../Components/Ajouter';
import AllColone from '../Components/AllColone'
import Modifier from '../Components/Modifier';
import { motion, AnimatePresence } from 'framer-motion';

export default function Tasks() {
    const [showpopup, setShowpopup] = useState(false)
    const [reload, setReload] = useState(false)
    const [taskToEdit, setTaskToEdit] = useState(null)

    const handleShow = () => setShowpopup(true);

    const handleClosePopup = () => {
        setShowpopup(false);
        setReload(prev => !prev);
    };

    const handleCloseEdit = () => {
        setTaskToEdit(null);
        setReload(prev => !prev);
    };

    return (
        <div className="max-w-[1400px] mx-auto">
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10"
            >
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Kanban Board</h1>
                    <p className="text-slate-400 text-sm">Manage your task flow across columns.</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 p-1 bg-white/5 rounded-xl border border-white/10">
                        <button className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-all">
                            <Filter size={18} />
                        </button>
                        <button className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-all">
                            <CalendarIcon size={18} />
                        </button>
                    </div>

                    <button
                        onClick={handleShow}
                        className="flex items-center gap-2 bg-brand-cyan text-black px-6 py-3 rounded-xl font-bold shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:scale-105 active:scale-95 transition-all"
                    >
                        <Plus size={20} />
                        Create Task
                    </button>
                </div>
            </motion.div>

            {/* Board Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <AllColone reload={reload} onEdit={(task) => setTaskToEdit(task)} />
            </motion.div>

            {/* Modals */}
            <AnimatePresence>
                {showpopup && <Ajouter onClose={handleClosePopup} />}
            </AnimatePresence>

            <AnimatePresence>
                {taskToEdit && (
                    <Modifier task={taskToEdit} onClose={handleCloseEdit} />
                )}
            </AnimatePresence>
        </div>
    );
}
