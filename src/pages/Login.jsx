import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Layers } from 'lucide-react';

export default function Login() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        if (!name.trim()) newErrors.name = "Name is required";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) newErrors.email = "Email is required";
        else if (!emailRegex.test(email)) newErrors.email = "Invalid email format";

        if (!password.trim()) newErrors.password = "Password is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleClick = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            localStorage.setItem('name', name);
            navigate('/Home');
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-[#0a0a0a]">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-cyan/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-indigo/10 blur-[120px] rounded-full" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md glass-panel p-10 rounded-[2.5rem] shadow-2xl relative z-10"
            >
                <div className="flex flex-col items-center mb-10">
                    <div className="w-16 h-16 bg-brand-cyan rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.3)] mb-6">
                        <Layers size={32} className="text-black" />
                    </div>
                    <h1 className="text-3xl font-black text-white tracking-tight mb-2">Welcome Back</h1>
                    <p className="text-slate-400 text-sm">Please sign in to continue to WorkFlowHub</p>
                </div>

                <form className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Username</label>
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-brand-cyan transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder='Your name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={`w-full bg-white/5 border ${errors.name ? 'border-red-500/50' : 'border-white/10'} rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-brand-cyan/50 transition-all font-medium`}
                            />
                        </div>
                        {errors.name && <p className="text-[10px] text-red-400 ml-1 italic">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-brand-cyan transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder='email@example.com'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`w-full bg-white/5 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-brand-cyan/50 transition-all font-medium`}
                            />
                        </div>
                        {errors.email && <p className="text-[10px] text-red-400 ml-1 italic">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-brand-cyan transition-colors" size={18} />
                            <input
                                type="password"
                                placeholder='••••••••'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full bg-white/5 border ${errors.password ? 'border-red-500/50' : 'border-white/10'} rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-brand-cyan/50 transition-all font-medium`}
                            />
                        </div>
                        {errors.password && <p className="text-[10px] text-red-400 ml-1 italic">{errors.password}</p>}
                    </div>

                    <button
                        onClick={handleClick}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-brand-cyan to-brand-indigo text-black font-black py-4 rounded-2xl shadow-xl hover:shadow-brand-cyan/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:hover:scale-100"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        ) : (
                            <>
                                Sign In
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-10 pt-6 border-t border-white/5 text-center">
                    <p className="text-slate-500 text-sm">
                        Don't have an account? <span className="text-brand-cyan hover:underline cursor-pointer font-bold">Request Access</span>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
