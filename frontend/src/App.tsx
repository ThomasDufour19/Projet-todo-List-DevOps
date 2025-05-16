import { useState, useEffect } from 'react'
import './App.css'

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;  // Date de création
  dueDate: string;    // Date d'échéance
}

const API_URL = 'http://localhost:5000/todos';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [dueDate, setDueDate] = useState(''); // Nouvel état pour la date d'échéance
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  const [editDueDate, setEditDueDate] = useState(''); // Nouvel état pour l'édition de la date

  // Charger les todos au démarrage
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Erreur lors du chargement des todos:', error);
    }
  };

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim() === '') return;
    
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          text: newTodo,
          completed: false,
          createdAt: new Date().toISOString(), // Date de création actuelle
          dueDate: dueDate || null // Date d'échéance (peut être null)
        }),
      });
      const data = await response.json();
      setTodos([data, ...todos]);
      setNewTodo('');
      setDueDate(''); // Réinitialiser la date d'échéance
    } catch (error) {
      console.error('Erreur lors de l\'ajout du todo:', error);
    }
  };

  const toggleTodo = async (id: number) => {
    try {
      const todo = todos.find(t => t.id === id);
      if (!todo) return;

      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !todo.completed }),
      });
      const updatedTodo = await response.json();
      setTodos(todos.map(t => t.id === id ? updatedTodo : t));
    } catch (error) {
      console.error('Erreur lors de la mise à jour du todo:', error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression du todo:', error);
    }
  };

  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
    setEditDueDate(todo.dueDate || '');
  };

  const saveEdit = async (id: number) => {
    if (editText.trim() === '') return;
    
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          text: editText,
          dueDate: editDueDate || null
        }),
      });
      const updatedTodo = await response.json();
      setTodos(todos.map(t => t.id === id ? updatedTodo : t));
      setEditingId(null);
      setEditText('');
      setEditDueDate('');
    } catch (error) {
      console.error('Erreur lors de la modification du todo:', error);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
    setEditDueDate('');
  };

  // Fonction pour formater la date
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
            <input
              type="datetime-local"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="date-input"
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
                  <input
                    type="datetime-local"
                    value={editDueDate}
                    onChange={(e) => setEditDueDate(e.target.value)}
                    className="date-input"
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
                    <div className="todo-text">
                      <span className={todo.completed ? 'completed' : ''}>
                        {todo.text}
                      </span>
                      <div className="todo-dates">
                        <small>Créé le: {formatDate(todo.createdAt)}</small>
                        {todo.dueDate && (
                          <small>Échéance: {formatDate(todo.dueDate)}</small>
                        )}
                      </div>
                    </div>
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
