"use client";


import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where } from "firebase/firestore";
import { db } from "../firebase"; 


interface Task {
  id: string;
  text: string;
  completed: boolean;
  new?: boolean;
  userId: string;
}

export default function TodoList({ userId }: { userId: string }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      const tasksRef = collection(db, "tasks");
      const q = query(tasksRef, where("userId", "==", userId));
      const taskSnapshot = await getDocs(q);
  
      const fetchedTasks = taskSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          text: data.text || "",
          completed: data.completed || false,
          userId: data.userId || "",
        } as Task;
      });
  
      setTasks(fetchedTasks);
    };
    fetchTasks();
  }, [userId]);  
  

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      console.log("Adding Task:", newTask); // Debug the new task text
      console.log("User ID in TodoList:", userId);
  
      try {
        const docRef = await addDoc(collection(db, "tasks"), {
          text: newTask.trim(),
          completed: false,
          userId: userId, // Ensure userId is passed to Firestore
        });
  
        console.log("Task added with ID:", docRef.id); 
  
        const addedTask = {
          id: docRef.id,
          text: newTask.trim(),
          completed: false,
          userId: userId, // Ensure the userId is part of the task state
          new: true, // Add the `new` property
        };
  
        setTasks([...tasks, addedTask]);
        setNewTask(""); // Clear input field
  
        // Remove the `new` property after 1 second
        setTimeout(() => {
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.id === docRef.id ? { ...task, new: false } : task
            )
          );
        }, 1000);
      } catch (error) {
        console.error("Error adding task:", error); // Debug any errors
      }
    } else {
      console.log("Task is empty, not adding.");
    }
  };
  
  
  
  const deleteTask = async (id: string) => {
    await deleteDoc(doc(db, "tasks", id));
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTask = async (id: string, completed: boolean) => {
    await updateDoc(doc(db, "tasks", id), { completed: !completed });
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
                onChange={() => toggleTask(task.id, task.completed)}
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
