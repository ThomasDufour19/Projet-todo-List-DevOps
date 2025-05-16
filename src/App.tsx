import { useState } from 'react'
import './App.css'

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim() === '') return;
    
    setTodos([...todos, {
      id: Date.now(),
      text: newTodo,
      completed: false
    }]);
    setNewTodo('');
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = (id: number) => {
    if (editText.trim() === '') return;
    
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: editText } : todo
    ));
    setEditingId(null);
    setEditText('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  return (
    <div className="container">
      <div className="todo-app">
        <h1>Ma Todo List</h1>
        
        <form onSubmit={addTodo} className="todo-form">
          <div className="input-group">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Ajouter une tâche..."
              className="todo-input"
            />
            <button type="submit" className="add-button">
              Ajouter
            </button>
          </div>
        </form>

        <ul className="todo-list">
          {todos.map(todo => (
            <li key={todo.id} className="todo-item">
              {editingId === todo.id ? (
                <div className="edit-group">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="edit-input"
                    autoFocus
                  />
                  <div className="edit-buttons">
                    <button onClick={() => saveEdit(todo.id)} className="save-button">
                      Sauvegarder
                    </button>
                    <button onClick={cancelEdit} className="cancel-button">
                      Annuler
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="todo-content">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                      className="todo-checkbox"
                    />
                    <span className={todo.completed ? 'completed' : ''}>
                      {todo.text}
                    </span>
                  </div>
                  <div className="todo-actions">
                    <button
                      onClick={() => startEditing(todo)}
                      className="edit-button"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="delete-button"
                    >
                      Supprimer
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
