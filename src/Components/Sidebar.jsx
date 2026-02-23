import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    CheckSquare,
    Trash2,
    Settings,
    LogOut,
    Layers,
    Search
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Sidebar({ onLogout }) {
    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/Home' },
        { icon: CheckSquare, label: 'Tasks', path: '/Tasks' },
        { icon: Trash2, label: 'Trash', path: '/Corbeille' },
    ];

    return (
        <div className="fixed left-0 top-0 h-screen w-64 glass-panel border-r border-white/10 flex flex-col z-50">
            <div className="p-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-brand-cyan rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                    <Layers className="text-black w-5 h-5" />
                </div>
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                    WorkFlowHub
                </h1>
            </div>

            <div className="px-4 mb-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-brand-cyan/50 transition-colors"
                    />
                </div>
            </div>

            <nav className="flex-1 px-4 py-4 flex flex-col gap-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `
              group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
              ${isActive
                                ? 'bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20'
                                : 'text-slate-400 hover:bg-white/5 hover:text-white'}
            `}
                    >
                        <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                        <span className="font-medium">{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 mt-auto border-t border-white/10">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-cyan to-brand-indigo flex items-center justify-center text-white font-bold text-sm">
                        {localStorage.getItem('name')?.substring(0, 2).toUpperCase() || 'HB'}
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-semibold truncate capitalize">
                            {localStorage.getItem('name') || 'Workflow User'}
                        </p>
                        <p className="text-xs text-slate-500 truncate">Free Plan</p>
                    </div>
                    <Settings className="w-4 h-4 text-slate-400 cursor-pointer hover:text-white transition-colors" />
                </div>

                <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </div>
    );
}
