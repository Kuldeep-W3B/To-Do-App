import { useState } from "react";

export default function AddTodoForm({ onAddTodo, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description) {
      onAddTodo({ title, description });
      setTitle("");
      setDescription("");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl text-black font-bold mb-4">Add New To-Do</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task Title"
            className="w-full p-2 text-black border rounded mb-4"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task Description"
            className="w-full p-2 text-black border rounded mb-4"
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="bg-red-500 text-white px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
