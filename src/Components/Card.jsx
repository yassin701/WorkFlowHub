import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import {
  MoreVertical,
  Calendar,
  MessageSquare,
  Paperclip,
  AlertCircle,
  Clock,
  CheckCircle2
} from "lucide-react";
import { motion } from "framer-motion";

export default function Card({ task, index, onEdit }) {
  const priorityStyles = {
    high: {
      bg: "bg-red-400/10",
      text: "text-red-400",
      border: "border-red-400/20",
      icon: AlertCircle
    },
    medium: {
      bg: "bg-amber-400/10",
      text: "text-amber-400",
      border: "border-amber-400/20",
      icon: Clock
    },
    low: {
      bg: "bg-emerald-400/10",
      text: "text-emerald-400",
      border: "border-emerald-400/20",
      icon: CheckCircle2
    }
  };

  const currentStyles = priorityStyles[task.priority] || priorityStyles.medium;
  const PriorityIcon = currentStyles.icon;

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="mb-4 outline-none"
        >
          <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            className={`
              glass-card p-4 rounded-2xl group cursor-pointer relative
              ${snapshot.isDragging ? 'shadow-2xl border-brand-cyan/40 bg-white/[0.08]' : ''}
              ${task.status === 'Done' ? 'opacity-80' : ''}
            `}
            onClick={() => onEdit && onEdit(task)}
          >
            {/* Priority Badge */}
            <div className="flex items-center justify-between mb-3">
              <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${currentStyles.bg} ${currentStyles.text} border ${currentStyles.border}`}>
                <PriorityIcon size={12} />
                {task.priority}
              </div>
              <button className="text-slate-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                <MoreVertical size={16} />
              </button>
            </div>

            {/* Content */}
            <h3 className={`text-sm font-semibold mb-2 line-clamp-2 ${task.status === 'Done' ? 'line-through text-slate-500' : 'text-slate-200'}`}>
              {task.title}
            </h3>

            {task.description && (
              <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                {task.description}
              </p>
            )}

            {/* Footer Metadata */}
            <div className="flex items-center justify-between pt-3 border-t border-white/5">
              <div className="flex items-center gap-3 text-slate-500">
                <div className="flex items-center gap-1">
                  <MessageSquare size={12} />
                  <span className="text-[10px]">2</span>
                </div>
                <div className="flex items-center gap-1">
                  <Paperclip size={12} />
                  <span className="text-[10px]">1</span>
                </div>
              </div>

              <div className="flex -space-x-2">
                {[1, 2].map((i) => (
                  <div key={i} className="w-5 h-5 rounded-full border-2 border-[#0a0a0a] bg-gradient-to-br from-slate-700 to-slate-800 text-[8px] flex items-center justify-center font-bold">
                    U
                  </div>
                ))}
              </div>
            </div>

            {/* Status Indicator */}
            {task.status === 'Done' && (
              <div className="absolute top-2 right-2 text-brand-cyan">
                <CheckCircle2 size={14} />
              </div>
            )}
          </motion.div>
        </div>
      )}
    </Draggable>
  );
}
