"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

interface Task {
  id: number;
  text: string;
  completed: boolean;
  new?: boolean;
}

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        { id: Date.now(), text: newTask.trim(), completed: false, new: true },
      ]);
      setNewTask("");
      setTimeout(() => {
        setTasks((prev) =>
          prev.map((task) => ({ ...task, new: task.new ? false : task.new }))
        );
      }, 2000); // Remove the highlight after 2 seconds
    }
  };
  

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const remainingTasks = tasks.filter((task) => !task.completed).length;

  return (
    <div>
      <form onSubmit={addTask} className="flex gap-2 mb-6">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="flex-grow px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Add
        </button>
      </form>

      <ul className="divide-y divide-gray-200">
        {tasks.map((task) => (
            <li
            key={task.id}
                className={`flex items-center justify-between py-3 px-4 hover:bg-gray-100 rounded-lg transition duration-300 ${
                task.new ? "bg-purple-100 animate-pulse" : ""
            }`}
            >
            <div className="flex items-center gap-2">
                <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="h-4 w-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                />
                <span
                className={`${
                    task.completed ? "line-through text-gray-500" : "text-gray-800"
                }`}
                >
                {task.text}
                </span>
            </div>
            <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:text-red-700"
            >
                <Trash2 className="w-5 h-5" />
            </button>
            </li>
        ))}
        </ul>
        <div className="text-center text-gray-600 mt-4">
            {remainingTasks === 0
                ? "All tasks are completed 🎉"
                : `${remainingTasks} task${remainingTasks > 1 ? "s" : ""} remaining`}
            </div>
    </div>
  );
}
