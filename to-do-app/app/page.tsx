"use client";

import Sidebar from "../components/Sidebar";
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Todo } from "../types/todo";

export default function Home() {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todo_app_data", []);

  function addTodo(text: string) {
    setTodos([{ id: Date.now().toString(), text, completed: false }, ...todos]);
  }

  function update(id: string, text: string) {
    setTodos(todos.map(t => (t.id === id ? { ...t, text } : t)));
  }

  function toggle(id: string) {
    setTodos(todos.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  }

  function remove(id: string) {
    setTodos(todos.filter(t => t.id !== id));
  }
  function reorderTodos(newList: Todo[]) {
  setTodos(newList);
}
  return (
    <div className="min-h-screen bg-[#F5F6FA] flex">
      <Sidebar />

      <main className="flex-1 px-12 py-10">
        <h1 className="text-3xl font-semibold text-zinc-900 mb-1">
          Great Day to Multitask, Madhu!
        </h1>
        <p className="text-zinc-500 text-sm mb-8">
          Today, {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
        </p>

        <div className="max-w-xl">
          <TodoInput onAdd={addTodo} />

          <div className="mt-8">
            <TodoList todos={todos} onToggle={toggle} onUpdate={update} onDelete={remove}  onReorder={reorderTodos} />
          </div>
        </div>
      </main>
    </div>
  );
}
