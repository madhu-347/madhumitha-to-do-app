"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Todo } from "../types/todo";
import { CalendarX , PartyPopper} from "lucide-react";
import toast from "react-hot-toast";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onToggle, onUpdate, onDelete }: Props) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.text);
  
  const { attributes, listeners, setNodeRef, transform, transition } =
  useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    };
  function save() {
    const trimmed = text.trim();
    if (!trimmed) return;
    onUpdate(todo.id, trimmed);
    setEditing(false);
  }

  return (
    <AnimatePresence>
      <motion.li
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        layout
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 6 }}
        transition={{ duration: 0.2 }}
        className="
            relative flex items-center justify-between 
            bg-white px-5 py-4 rounded-2xl
            border border-zinc-200 shadow-sm 
            hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing
        "
        >

        <div className="flex items-center gap-4 flex-1">
          {/* Checkbox */}
          <motion.div
            whileTap={{ scale: 0.8 }}
            onClick={() => {
                onToggle(todo.id);

                if (!todo.completed) {
                    toast.success("Task completed successfully!", {
                    icon: <PartyPopper className="text-green-600"/>,
                    });
                }
                }}
            className={`
              w-6 h-6 rounded-md border flex items-center justify-center cursor-pointer
              ${todo.completed ? "bg-green-500 border-green-500" : "border-zinc-400"}
            `}
            transition={{ duration: 0.2 }}
          >
            <motion.svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              initial="hidden"
              animate={todo.completed ? "visible" : "hidden"}
            >
              <motion.path
                fill="none"
                stroke="#fff"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
                variants={{
                  hidden: { pathLength: 0 },
                  visible: { pathLength: 1 },
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />
            </motion.svg>
          </motion.div>

          {/* TEXT OR EDIT INPUT */}
          {!editing ? (
            <motion.span
              layout
              className={`flex-1 text-[15px] ${
                todo.completed ? "line-through text-zinc-400" : "text-zinc-700"
              }`}
              animate={{ opacity: todo.completed ? 0.5 : 1 }}
            >
              {todo.text}
            </motion.span>
          ) : (
            <input
              className="
                flex-1 border-b border-zinc-300 bg-transparent 
                focus:outline-none text-[15px] text-zinc-700
              "
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") save();
                if (e.key === "Escape") setEditing(false);
              }}
              autoFocus
            />
          )}
        </div>

        {/* BUTTON ACTIONS */}
        <div className="flex items-center gap-2">
          {!editing ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setEditing(true)}
              className="
                px-3 py-1.5 text-sm text-zinc-600 
                hover:bg-zinc-100 rounded-lg transition
              "
            >
              Edit
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              onClick={save}
              className="
                px-3 py-1.5 text-sm text-blue-600 
                hover:bg-blue-50 rounded-lg transition
              "
            >
              Save
            </motion.button>
          )}

        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => {
                onDelete(todo.id);
                toast.error(`Task deleted successfully`, {
                icon: <CalendarX className="text-red-600"/>,
                });
            }}
            className="
                px-3 py-1.5 text-sm text-red-600 
                hover:bg-red-50 rounded-lg transition
            "
            >
            Delete
            </motion.button>
        </div>
      </motion.li>
    </AnimatePresence>
  );
}
