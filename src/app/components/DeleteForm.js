"use client";

export default function DeleteTodoForm({ todo, onDeleteTodo, onCancel }) {
  const handleDelete = () => {
    onDeleteTodo(todo._id);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <p className="text-black mb-4">Are you sure you want to delete this to-do?</p>
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
