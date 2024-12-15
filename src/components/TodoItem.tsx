import React from 'react';
import { Check, Trash2, Square } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-3">
        <button
          onClick={() => onToggle(todo.id)}
          className={`p-1 rounded-md transition-colors ${
            todo.completed ? 'text-green-500 hover:text-green-600' : 'text-gray-400 hover:text-gray-500'
          }`}
        >
          {todo.completed ? <Check size={20} /> : <Square size={20} />}
        </button>
        <span
          className={`text-gray-800 ${
            todo.completed ? 'line-through text-gray-400' : ''
          }`}
        >
          {todo.text}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="text-gray-400 hover:text-red-500 transition-colors"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}