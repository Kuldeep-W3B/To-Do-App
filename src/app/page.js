"use client";

import { useState, useEffect } from "react";
import AddTodoForm from "@/app/components/AddForm";
import UpdateTodoForm from "@/app/components/UpdateForm";
import DeleteTodoForm from "@/app/components/DeleteForm";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [showAddTodoForm, setShowAddTodoForm] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [showUpdateTodoForm, setShowUpdateTodoForm] = useState(false);
  const [showDeleteTodoForm, setShowDeleteTodoForm] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch("/api/todos/getTodo");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  };

  const addTodo = async ({ title, description }) => {
    await fetch("/api/todos/addTodo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });
    setShowAddTodoForm(false);
    fetchTodos();
  };

  const updateTodo = async (id, updatedTitle, updatedDescription) => {
    await fetch(`/api/todos/update?id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: updatedTitle, description: updatedDescription }),
    });
    setShowUpdateTodoForm(false);
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await fetch(`/api/todos/delete?id=${id}`, {
      method: "DELETE",
    });
    setShowDeleteTodoForm(false);
    fetchTodos();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">To-Do App</h1>
          <button
            onClick={() => setShowAddTodoForm(true)}
            className="bg-white text-blue-600 px-4 py-2 rounded shadow"
          >
            Add To-Do
          </button>
        </div>
      </nav>

      {showAddTodoForm && (
        <AddTodoForm
          onAddTodo={addTodo}
          onCancel={() => setShowAddTodoForm(false)}
        />
      )}

      {showUpdateTodoForm && (
        <UpdateTodoForm
          todo={currentTodo}
          onUpdateTodo={updateTodo}
          onCancel={() => setShowUpdateTodoForm(false)}
        />
      )}

      {showDeleteTodoForm && (
        <DeleteTodoForm
          todo={currentTodo}
          onDeleteTodo={deleteTodo}
          onCancel={() => setShowDeleteTodoForm(false)}
        />
      )}

      <div className="max-w-xl mx-auto mt-8 p-4">
        <ul className="space-y-6">
          {todos.map((todo) => (
            <li key={todo._id} className="bg-white shadow-md rounded-lg p-4 flex flex-col space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-black">{todo.title}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setCurrentTodo(todo);
                      setShowUpdateTodoForm(true);
                    }}
                    className="p-2 text-yellow-500 hover:text-yellow-600"
                  >
                    <PencilIcon className="h-6 w-6" />
                  </button>
                  <button
                    onClick={() => {
                      setCurrentTodo(todo);
                      setShowDeleteTodoForm(true);
                    }}
                    className="p-2 text-red-500 hover:text-red-600"
                  >
                    <TrashIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>
              <p className="text-gray-600">{todo.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
