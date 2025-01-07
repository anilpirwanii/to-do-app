import TodoList from "./TodoList";

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-semibold text-purple-700 text-center mb-4">
          My Tasks
        </h1>
        <TodoList />
      </div>
    </main>
  );
}
