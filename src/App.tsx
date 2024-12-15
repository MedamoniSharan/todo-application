import React, { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { TodoItem } from './components/TodoItem';
import { TodoInput } from './components/TodoInput';
import { Todo } from './types/todo';

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    if (saved) {
      return JSON.parse(saved).map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt)
      }));
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    setTodos([
      {
        id: crypto.randomUUID(),
        text,
        completed: false,
        createdAt: new Date()
      },
      ...todos
    ]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto p-6">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Todo App</h1>
          <p className="text-gray-600">Stay organized and productive</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <TodoInput onAdd={addTodo} />
        </div>

        {todos.length > 0 && (
          <div className="bg-blue-50 rounded-lg p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="text-blue-500" />
              <span className="text-blue-700">
                {completedCount} of {todos.length} tasks completed
              </span>
            </div>
            <span className="text-blue-500 text-sm">
              {((completedCount / todos.length) * 100).toFixed(0)}%
            </span>
          </div>
        )}

        <div className="space-y-3">
          {todos.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No todos yet. Add one above!
            </div>
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;