"use client";

import { useState } from "react";

interface TodoInputProps {
  onAdd: (text: string) => void;
}

export default function TodoInput({ onAdd }: TodoInputProps) {
  const [value, setValue] = useState("");

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const text = value.trim();
    if (!text) return;
    onAdd(text);
    setValue("");
  }

  return (
    <form onSubmit={submit} className="flex gap-3">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Create new task..."
        className="
          flex-1 rounded-2xl bg-white px-5 py-3.5 border border-zinc-200
          shadow-sm text-[15px] text-zinc-700 placeholder:text-zinc-400
          focus:outline-none focus:ring-2 focus:ring-indigo-400/30
          transition
        "
      />

      <button
        type="submit"
        className="
          px-6 py-3.5 bg-black text-white rounded-2xl 
          hover:bg-gray-800 transition shadow-sm font-medium
        "
      >
        Add
      </button>
    </form>
  );
}
